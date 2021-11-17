import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Flex } from '@chakra-ui/react'
import { DndContext, DragOverlay } from '@dnd-kit/core'

import { BasicField } from '~shared/types/field'

import { BuilderContent } from './components/BuilderContent'
import { BuilderDrawer } from './components/BuilderDrawer'
import { FieldOption } from './components/BuilderDrawer/DraggableField'
import { BuilderSidebar } from './components/BuilderSidebar'
import { generateBasicFieldItems, useBuilderPage } from './BuilderPageContext'

export const BuilderPage = (): JSX.Element => {
  const [copyDragItem, setCopyDragItem] = useState<{
    id: string
    fieldType: BasicField
  } | null>(null)
  const { draggableBasicFieldItems, setDraggableBasicFieldItems } =
    useBuilderPage()

  return (
    <DndContext
      onDragStart={({ active }) => {
        const item = draggableBasicFieldItems.find((i) => i.id === active.id)
        if (item) {
          setCopyDragItem(item)
        }
      }}
      onDragEnd={({ active, over }) => {
        console.log('ondragend', active, over)
        const item = draggableBasicFieldItems.find((i) => i.id === active.id)
        if (item && over) {
          setDraggableBasicFieldItems(generateBasicFieldItems())
        }
        setCopyDragItem(null)
      }}
    >
      <Flex direction="row" flex={1} bg="neutral.200" overflow="hidden">
        <Flex h="100%" w="100%" overflow="auto">
          <BuilderSidebar />
          <BuilderDrawer />
          <BuilderContent />
        </Flex>
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
