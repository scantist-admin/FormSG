import { Flex } from '@chakra-ui/react'

import { BuilderContent } from './components/BuilderContent'
import { BuilderSidebar } from './components/BuilderSidebar'

export const BuilderPage = (): JSX.Element => {
  return (
    <Flex h="100%" w="100%" overflow="auto" bg="neutral.200" direction="row">
      <BuilderSidebar />
      <BuilderContent />
    </Flex>
  )
}
