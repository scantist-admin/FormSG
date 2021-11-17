import { useMemo } from 'react'
import {
  Box,
  Divider,
  Stack,
  StackDivider,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'

import { Tab } from '~components/Tabs'

import { useBuilderPage } from '../../BuilderPageContext'
import { BuilderTabs } from '../../types'

import { DraggableFieldOption } from './DraggableField'

export const BuilderDrawerContent = (): JSX.Element | null => {
  const { activeTab } = useBuilderPage()

  if (activeTab === BuilderTabs.Logic) return null

  if (activeTab === BuilderTabs.Design) return null

  return <BuilderDrawerBuilderContent />
}

const BuilderDrawerBuilderContent = (): JSX.Element => {
  return (
    <Tabs pos="relative" h="100%" display="flex" flexDir="column">
      <Box pt="1rem" px="1.5rem" bg="white">
        <Text textStyle="subhead-3" color="secondary.500" mb="1rem">
          Builder
        </Text>
        <TabList mx="-1rem" w="100%">
          <Tab>Basic</Tab>
          <Tab>MyInfo</Tab>
        </TabList>
        <Divider w="auto" mx="-1.5rem" />
      </Box>
      <TabPanels pb="1rem" flex={1} overflowY="auto">
        <TabPanel>
          <BasicFieldPanelContent />
        </TabPanel>
        <TabPanel>MyInfo</TabPanel>
      </TabPanels>
    </Tabs>
  )
}

const BasicFieldPanelContent = () => {
  const { draggableBasicFieldItems } = useBuilderPage()

  const pageFieldOptions = useMemo(
    () => draggableBasicFieldItems.slice(0, 3),
    [draggableBasicFieldItems],
  )
  const fieldFieldOptions = useMemo(
    () => draggableBasicFieldItems.slice(3),
    [draggableBasicFieldItems],
  )

  return (
    <Box>
      <FieldSection label="Page">
        {pageFieldOptions.map((props) => (
          <DraggableFieldOption key={props.id} {...props} />
        ))}
      </FieldSection>
      <FieldSection label="Fields">
        {fieldFieldOptions.map((props) => (
          <DraggableFieldOption key={props.id} {...props} />
        ))}
      </FieldSection>
    </Box>
  )
}

const FieldSection = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => {
  return (
    <Box mb="0.5rem">
      <Text
        px="1.5rem"
        pt="1rem"
        pb="0.75rem"
        textStyle="subhead-2"
        color="secondary.500"
        pos="sticky"
        top={0}
        bg="white"
      >
        {label}
      </Text>
      <Stack divider={<StackDivider />} spacing={0}>
        {children}
      </Stack>
    </Box>
  )
}
