import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

import { BuilderDrawer } from '../BuilderDrawer'
import { FieldOption } from '../BuilderDrawer/DraggableField'

import { CreateFieldHint } from './CreateFieldHint'
import { FormBuilder } from './FormBuilder'
import { useFormBuilder } from './FormBuilderContext'
import { SortableFieldRow } from './SortableFieldRow'

export const FormBuilderScreen = (): JSX.Element => {
  const {
    currentDragItem,
    sortItems,
    handleDragCancel,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
  } = useFormBuilder()

  const showDropzone = useMemo(() => {
    if (sortItems.length === 0) return true
    return false
  }, [sortItems])

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
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
          {currentDragItem ? (
            <FieldOption isDragOverlay {...currentDragItem} />
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
