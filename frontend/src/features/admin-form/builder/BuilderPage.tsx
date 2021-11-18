import { useState } from 'react'
import { createPortal } from 'react-dom'
import { BiGridHorizontal } from 'react-icons/bi'
import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
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
  const [dragItem, setDragItem] = useState<DragItem | null>(null)
  const { draggableBasicFieldItems, setDraggableBasicFieldItems } =
    useBuilderPage()

  const [sortItems, setSortItems] = useState<DragItem[]>([])

  return (
    <DndContext
      onDragStart={({ active }) => {
        setDragItem(pick(active.data.current, ['id', 'fieldType']) as DragItem)
      }}
      onDragOver={({ active, over }) => {
        // Create type, check index to insert new field.
        if (dragItem && active.data.current?.type === FieldDropType.Create) {
          setSortItems((items) => {
            const overIndex = sortItems.findIndex((i) => i.id === over?.id)
            const newIndex = overIndex === -1 ? items.length : overIndex

            return [
              ...items.slice(0, newIndex),
              { ...dragItem, isCreate: true },
              ...items.slice(newIndex),
            ]
          })
        }
      }}
      onDragCancel={({ active }) => {
        const item = draggableBasicFieldItems.find((i) => i.id === active.id)
        if (item) {
          const filteredSortItems = sortItems.filter((i) => i.id !== item.id)
          if (filteredSortItems.length < sortItems.length) {
            setSortItems(filteredSortItems)
            setDraggableBasicFieldItems(generateBasicFieldItems())
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
        setDragItem(null)
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
          {dragItem ? <FieldOption isDragOverlay {...dragItem} /> : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}

const SortArea = (props: any) => {
  const { children } = props
  const { setNodeRef } = useDroppable({
    id: 'sortArea',
    data: { type: 'sortArea' },
  })

  return (
    <Box ref={setNodeRef} flex={1}>
      <Stack spacing="2.25rem">{children}</Stack>
    </Box>
  )
}

const SortItem = ({ item }: { item: DragItem }) => {
  const {
    listeners,
    setNodeRef,
    transform,
    attributes,
    transition,
    isDragging,
  } = useSortable({
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
        {...attributes}
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
    )
  }

  if (isDragging) {
    return (
      <Box
        style={style}
        px="2.5rem"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <FieldOption isDragging={isDragging} {...item} />
      </Box>
    )
  }

  return (
    <Flex
      bg="secondary.100"
      borderRadius="4px"
      _focusWithin={{
        boxShadow: '0 0 0 2px var(--chakra-colors-primary-500)',
      }}
      style={style}
      px="2.5rem"
      ref={setNodeRef}
      flexDir="column"
      align="center"
    >
      <Icon
        as={BiGridHorizontal}
        color="secondary.200"
        fontSize="1.5rem"
        {...listeners}
        {...attributes}
        cursor="grab"
        transition="color 0.2s ease"
        _hover={{
          color: 'secondary.300',
        }}
      />
      {item.fieldType}
    </Flex>
  )
}
