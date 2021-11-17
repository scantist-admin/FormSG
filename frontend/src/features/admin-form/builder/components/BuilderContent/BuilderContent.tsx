import { Flex } from '@chakra-ui/react'

import { useBuilderPage } from '../../BuilderPageContext'
import { BuilderTabs } from '../../types'

import { CreateFieldDropzone } from './CreateFieldDropzone'

export const BuilderContent = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const { activeTab } = useBuilderPage()

  if (activeTab === BuilderTabs.Logic) {
    return (
      <Flex flex={1} bg="white">
        Logic tab
      </Flex>
    )
  }

  return (
    <Flex m="2rem" mb={0} flex={1} bg="primary.100" p="2.5rem" justify="center">
      <Flex bg="white" p="2.5rem" maxW="57rem" w="100%" flexDir="column">
        {children}
        <CreateFieldDropzone />
      </Flex>
    </Flex>
  )
}
