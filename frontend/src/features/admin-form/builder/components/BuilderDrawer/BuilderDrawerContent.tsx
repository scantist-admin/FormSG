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
import { DragOverlay, useDndContext } from '@dnd-kit/core'

import { BasicField } from '~shared/types/field'

import { Tab } from '~components/Tabs'

import { useBuilderPage } from '../../BuilderPageContext'
import { BuilderTabs } from '../../types'

import { DraggableFieldOption, FieldOption } from './DraggableField'

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
      <TabPanels pb="1rem" px="1.5rem" flex={1} overflowY="auto">
        <TabPanel>
          <BasicFieldPanelContent />
        </TabPanel>
        <TabPanel>MyInfo</TabPanel>
      </TabPanels>
    </Tabs>
  )
}

const BasicFieldPanelContent = () => {
  const { active } = useDndContext()

  return (
    <>
      <Box>
        <FieldSection label="Page">
          <DraggableFieldOption fieldType={BasicField.Section} />
          <DraggableFieldOption fieldType={BasicField.Statement} />
          <DraggableFieldOption fieldType={BasicField.Image} />
        </FieldSection>
        <FieldSection label="Fields">
          <DraggableFieldOption fieldType={BasicField.ShortText} />
          <DraggableFieldOption fieldType={BasicField.LongText} />
          <DraggableFieldOption fieldType={BasicField.Radio} />
          <DraggableFieldOption fieldType={BasicField.Checkbox} />
          <DraggableFieldOption fieldType={BasicField.Mobile} />
          <DraggableFieldOption fieldType={BasicField.Email} />
          <DraggableFieldOption fieldType={BasicField.HomeNo} />
          <DraggableFieldOption fieldType={BasicField.Dropdown} />
          <DraggableFieldOption fieldType={BasicField.YesNo} />
          <DraggableFieldOption fieldType={BasicField.Rating} />
          <DraggableFieldOption fieldType={BasicField.Number} />
          <DraggableFieldOption fieldType={BasicField.Decimal} />
          <DraggableFieldOption fieldType={BasicField.Attachment} />
          <DraggableFieldOption fieldType={BasicField.Date} />
          <DraggableFieldOption fieldType={BasicField.Table} />
          <DraggableFieldOption fieldType={BasicField.Nric} />
          <DraggableFieldOption fieldType={BasicField.Uen} />
        </FieldSection>
      </Box>
      <DragOverlay dropAnimation={null}>
        {active ? (
          <FieldOption fieldType={active.data.current?.fieldType} />
        ) : null}
      </DragOverlay>
    </>
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
