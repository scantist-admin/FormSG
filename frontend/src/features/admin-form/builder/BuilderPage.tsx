import { Flex } from '@chakra-ui/react'

import { BuilderContent } from './components/BuilderContent'
import { BuilderSidebar } from './components/BuilderSidebar'
import { BuilderPageProvider } from './BuilderPageContext'

export const BuilderPage = (): JSX.Element => {
  return (
    <BuilderPageProvider>
      <Flex direction="row" bg="neutral.200" h="100%">
        <BuilderSidebar />
        <BuilderContent />
      </Flex>
    </BuilderPageProvider>
  )
}
