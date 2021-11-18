import { Box, Flex, Stack } from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'

import { useBuilderPage } from '../../BuilderPageContext'
import { BuilderTabs } from '../../types'

export const BuilderContent = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const { setNodeRef } = useDroppable({
    id: 'sortArea',
    data: { type: 'sortArea' },
  })

  const { activeTab } = useBuilderPage()

  if (activeTab === BuilderTabs.Logic) {
    return (
      <Flex flex={1} bg="white">
        Logic tab
      </Flex>
    )
  }

  return (
    // This specific layout offers the smoothest insertion of fields, where
    // fields can be slotted between other fields without flying in from the
    // bottom.
    <Flex m="2rem" mb={0} flex={1} bg="primary.100" p="2.5rem" justify="center">
      <Flex bg="white" p="2.5rem" maxW="57rem" w="100%" flexDir="column">
        <Box ref={setNodeRef} pb="5rem">
          <Stack spacing="2.25rem">{children}</Stack>
        </Box>
      </Flex>
    </Flex>
  )
}
