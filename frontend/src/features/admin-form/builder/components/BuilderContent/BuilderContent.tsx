import { Flex } from '@chakra-ui/react'

import { useBuilderPage } from '../../BuilderPageContext'
import { BuilderTabs } from '../../types'
import FormBuilderScreen from '../FormBuilderScreen'
import { FormBuilderProvider } from '../FormBuilderScreen/FormBuilderContext'

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
    <FormBuilderProvider>
      <FormBuilderScreen />
    </FormBuilderProvider>
  )
}
