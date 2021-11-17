import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Box, Flex } from '@chakra-ui/react'
import { DndContext, DragOverlay, useDroppable } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { BuilderContent } from './components/BuilderContent'
import { BuilderDrawer } from './components/BuilderDrawer'
import { FieldOption } from './components/BuilderDrawer/DraggableField'
import { BuilderSidebar } from './components/BuilderSidebar'
import { generateBasicFieldItems, useBuilderPage } from './BuilderPageContext'
import { DragItem, FieldDropType } from './types'

export const BuilderPage = (): JSX.Element => {
  const [copyDragItem, setCopyDragItem] = useState<DragItem | null>(null)
  const { draggableBasicFieldItems, setDraggableBasicFieldItems } =
    useBuilderPage()

  const [sortItems, setSortItems] = useState<{ id: string }[]>([])

  return (
    <DndContext
      onDragStart={({ active }) => {
        if (active.data.current?.type === FieldDropType.Create) {
          setCopyDragItem(active.data.current as DragItem)
        }
      }}
      onDragOver={(e) => {
        const { over } = e
        if (copyDragItem && over?.id === 'sortArea') {
          const sortIndex = sortItems.findIndex((i) => i.id === copyDragItem.id)
          if (sortIndex < 0) {
            setSortItems([...sortItems, { ...copyDragItem }])
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
          if (overIndex !== activeIndex) {
            setSortItems((items) => arrayMove(items, activeIndex, overIndex))
          }
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
            <FieldOption isDragOverlay {...copyDragItem} />
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

const SortItem = ({ item }: any) => {
  console.log(item)
  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: item.id,
      data: {
        type: FieldDropType.Reorder,
        item,
      },
    })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    width: 90,
    background: isDragging ? 'green' : '#ccc',
  }

  return (
    <div ref={setNodeRef} {...listeners} style={style}>
      {item.fieldType}
    </div>
  )
}
