import { Flex } from '@chakra-ui/react'
import { DndContext } from '@dnd-kit/core'

import { BuilderContent } from './components/BuilderContent'
import { BuilderDrawer } from './components/BuilderDrawer'
import { BuilderSidebar } from './components/BuilderSidebar'
import { BuilderPageProvider } from './BuilderPageContext'

export const BuilderPage = (): JSX.Element => {
  return (
    <BuilderPageProvider>
      <DndContext>
        <Flex direction="row" flex={1} bg="neutral.200" overflow="hidden">
          <Flex h="100%" w="100%" overflow="auto">
            <BuilderSidebar />
            <BuilderDrawer />
            <BuilderContent />
          </Flex>
        </Flex>
      </DndContext>
    </BuilderPageProvider>
  )
}
