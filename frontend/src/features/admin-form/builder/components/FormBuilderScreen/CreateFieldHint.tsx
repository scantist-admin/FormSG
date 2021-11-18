import { Flex, Icon, Text } from '@chakra-ui/react'

import { BxsWidget } from '~assets/icons/BxsWidget'

import { useBuilderPage } from '../../BuilderPageContext'

export const CreateFieldHint = (): JSX.Element => {
  const { handleBuilderClick } = useBuilderPage()

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
      bg="neutral.100"
      onClick={handleBuilderClick}
    >
      <Icon as={BxsWidget} fontSize="2rem" />
      <Text textStyle="subhead-2">
        Drag a field from the Builder on the left to start
      </Text>
    </Flex>
  )
}
