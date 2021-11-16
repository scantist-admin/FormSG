import { Box, Flex } from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'

import { useBuilderPage } from '../../BuilderPageContext'
import { BuilderTabs } from '../../types'

export const BuilderContent = (): JSX.Element => {
  const { activeTab } = useBuilderPage()

  if (activeTab === BuilderTabs.Logic) {
    return (
      <Flex flex={1} bg="white">
        Logic tab
      </Flex>
    )
  }

  return (
    <Flex m="2rem" mb={0} flex={1} bg="white">
      <NewDroppableField />
    </Flex>
  )
}

const NewDroppableField = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  })

  return (
    <Box
      h="200px"
      w="100%"
      ref={setNodeRef}
      color={isOver ? 'green.100' : undefined}
    >
      Drag a field from the Builder on the left to start
    </Box>
  )
}
