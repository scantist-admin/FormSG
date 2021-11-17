import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Box, Flex, Text } from '@chakra-ui/react'
import { DndContext, DragOverlay, useDroppable } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { omit, pick } from 'lodash'

import { BuilderContent } from './components/BuilderContent'
import { BuilderDrawer } from './components/BuilderDrawer'
import { FieldOption } from './components/BuilderDrawer/DraggableField'
import { BuilderSidebar } from './components/BuilderSidebar'
import { generateBasicFieldItems, useBuilderPage } from './BuilderPageContext'
import { DragItem, FieldDropType } from './types'

const removeIsCreate = (dragItem: DragItem) => {
  return omit(dragItem, 'isCreate')
}

export const BuilderPage = (): JSX.Element => {
  const [copyDragItem, setCopyDragItem] = useState<DragItem | null>(null)
  const { draggableBasicFieldItems, setDraggableBasicFieldItems } =
    useBuilderPage()

  const [sortItems, setSortItems] = useState<DragItem[]>([])

  return (
    <DndContext
      onDragStart={({ active }) => {
        setCopyDragItem(
          pick(active.data.current, ['id', 'fieldType']) as DragItem,
        )
      }}
      onDragOver={(e) => {
        const { over } = e
        if (copyDragItem && over?.id === 'sortArea') {
          const sortIndex = sortItems.findIndex((i) => i.id === copyDragItem.id)
          if (sortIndex < 0) {
            setSortItems([...sortItems, { ...copyDragItem, isCreate: true }])
          }
        }
      }}
      onDragEnd={({ active, over }) => {
        const item = draggableBasicFieldItems.find((i) => i.id === active.id)

        // Cancelled drag, but one of the basic field create items.
        if (!over && item) {
          const filteredSortItems = sortItems.filter((i) => i.id !== item.id)
          if (filteredSortItems.length < sortItems.length) {
            setSortItems(filteredSortItems)
            setDraggableBasicFieldItems(generateBasicFieldItems())
          }
        }

        if (over) {
          if (item) {
            setDraggableBasicFieldItems(generateBasicFieldItems())
          }
          const activeIndex = sortItems.findIndex((i) => i.id === active.id)
          const overIndex = sortItems.findIndex((i) => i.id === over.id)
          setSortItems((items) => {
            const nextSortItems = items.map(removeIsCreate)
            return overIndex !== activeIndex
              ? arrayMove(nextSortItems, activeIndex, overIndex)
              : nextSortItems
          })
        }
        setCopyDragItem(null)
      }}
    >
      <Flex h="100%" w="100%" overflow="auto" bg="neutral.200" direction="row">
        <BuilderSidebar />
        <BuilderDrawer />
        <BuilderContent>
          <SortableContext items={sortItems} id="sortList">
            <SortArea>
              {sortItems.map((item) => (
                <SortItem key={item.id} item={item} />
              ))}
            </SortArea>
          </SortableContext>
        </BuilderContent>
      </Flex>
      {createPortal(
        <DragOverlay>
          {copyDragItem ? (
            <FieldOption
              w="100%"
              maxW="26rem"
              isDragOverlay
              {...copyDragItem}
            />
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}

const SortArea = (props: any) => {
  const { children } = props
  const args = useDroppable({ id: 'sortArea', data: { type: 'sortArea' } })
  const { setNodeRef, isOver } = args

  const style = {
    flex: 1,
    display: 'flex',
    flexDir: 'column',
    flexWrap: 'wrap',
    background: isOver ? 'green' : '#ccc',
  } as const

  return (
    <Box ref={setNodeRef} {...style}>
      {children}
    </Box>
  )
}

const SortItem = ({ item }: { item: DragItem }) => {
  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: item.id,
      data: {
        ...item,
        type: FieldDropType.Reorder,
      },
    })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  if (isDragging && item.isCreate) {
    return (
      <Box
        style={style}
        ref={setNodeRef}
        {...listeners}
        py="2.25rem"
        px="2.5rem"
      >
        <Box
          py="1.5rem"
          px="2.5rem"
          bg="primary.200"
          border="1px solid"
          borderColor="primary.500"
          textAlign="center"
        >
          <Text textStyle="subhead-2" color="primary.400">
            Drop your field here
          </Text>
        </Box>
      </Box>
    )
  }

  if (isDragging) {
    return (
      <Box
        style={style}
        ref={setNodeRef}
        {...listeners}
        py="2.25rem"
        px="2.5rem"
      >
        <FieldOption isDragging={isDragging} {...item} />
      </Box>
    )
  }

  return (
    <div ref={setNodeRef} {...listeners} style={style}>
      {item.fieldType}
    </div>
  )
}
