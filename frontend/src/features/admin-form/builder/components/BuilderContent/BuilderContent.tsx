import { Flex } from '@chakra-ui/react'

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
      Remaining
    </Flex>
  )
}
