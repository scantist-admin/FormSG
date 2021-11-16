import { Flex } from '@chakra-ui/react'

import { BuilderDrawer } from './components/BuilderDrawer'

export const BuilderPage = (): JSX.Element => {
  return (
    <Flex direction="row" bg="neutral.200" h="100%">
      <BuilderDrawer />
      <Flex m="2rem" mb={0} flex={1} bg="white">
        Remaining
      </Flex>
    </Flex>
  )
}
