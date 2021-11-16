import {
  Box,
  Divider,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'

import { Tab } from '~components/Tabs'

import { useBuilderPage } from '../../BuilderPageContext'
import { BuilderTabs } from '../../types'

export const BuilderDrawerContent = (): JSX.Element | null => {
  const { activeTab } = useBuilderPage()

  if (activeTab === BuilderTabs.Logic) return null

  if (activeTab === BuilderTabs.Design) return null

  return <BuilderDrawerBuilderContent />
}

const BuilderDrawerBuilderContent = (): JSX.Element => {
  return (
    <Box py="1rem" px="1.5rem">
      <Text textStyle="subhead-3" color="secondary.500" mb="1rem">
        Builder
      </Text>
      <Tabs>
        <TabList mx="-1rem" w="100%">
          <Tab>Basic</Tab>
          <Tab>MyInfo</Tab>
        </TabList>
        <Divider w="auto" mx="-1.5rem" />
        <TabPanels>
          <TabPanel>Basic</TabPanel>
          <TabPanel>MyInfo</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
