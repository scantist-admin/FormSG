import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { omit, pick } from 'lodash'

import {
  generateBasicFieldItems,
  useBuilderPage,
} from '../../BuilderPageContext'
import { DragItem, FieldDropType } from '../../types'
import { BuilderDrawer } from '../BuilderDrawer'
import { FieldOption } from '../BuilderDrawer/DraggableField'

import { CreateFieldHint } from './CreateFieldHint'
import { FormBuilder } from './FormBuilder'
import { SortableFieldRow } from './SortableFieldRow'

const removeIsCreate = (dragItem: DragItem) => {
  return omit(dragItem, 'isCreate')
}

export const FormBuilderScreen = (): JSX.Element => {
  const [dragItem, setDragItem] = useState<DragItem | null>(null)
  const { draggableBasicFieldItems, setDraggableBasicFieldItems } =
    useBuilderPage()

  const [sortItems, setSortItems] = useState<DragItem[]>([])

  const showDropzone = useMemo(() => {
    if (sortItems.length === 0) return true
    return false
  }, [sortItems])

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
      <BuilderDrawer />
      <SortableContext items={sortItems} id="sortList">
        <FormBuilder>
          {showDropzone ? (
            <CreateFieldHint />
          ) : (
            sortItems.map((item) => (
              <SortableFieldRow key={item.id} item={item} />
            ))
          )}
        </FormBuilder>
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {dragItem ? <FieldOption isDragOverlay {...dragItem} /> : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
