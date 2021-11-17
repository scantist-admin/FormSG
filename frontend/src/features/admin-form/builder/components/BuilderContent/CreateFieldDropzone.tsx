import { Flex, Icon, Text } from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'

import { BxsWidget } from '~assets/icons/BxsWidget'

import { useBuilderPage } from '../../BuilderPageContext'

export const CreateFieldDropzone = (): JSX.Element => {
  const { handleBuilderClick } = useBuilderPage()
  const { isOver, setNodeRef } = useDroppable({
    id: 'create-field-dropzone',
  })

  return (
    <Flex
      h="13.75rem"
      w="100%"
      p="1.5rem"
      color="secondary.500"
      justify="center"
      align="center"
      flexDir="column"
      border="1px dashed"
      borderColor="secondary.300"
      borderRadius="0.25rem"
      bg={isOver ? 'primary.200' : 'neutral.100'}
      onClick={handleBuilderClick}
      ref={setNodeRef}
    >
      <Icon as={BxsWidget} fontSize="2rem" />
      <Text textStyle="subhead-2">
        {isOver
          ? 'Drop your field here'
          : 'Drag a field from the Builder on the left to start'}
      </Text>
    </Flex>
  )
}
