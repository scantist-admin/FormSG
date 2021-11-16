import { BiGitMerge } from 'react-icons/bi'
import { Flex, Stack } from '@chakra-ui/react'

import { BxsColorFill } from '~assets/icons/BxsColorFill'
import { BxsWidget } from '~assets/icons/BxsWidget'

import { useBuilderPage } from '../../BuilderPageContext'

import { BuilderDrawer } from './BuilderDrawer'
import { BuilderDrawerContent } from './BuilderDrawerContent'
import { BuilderTabIcon } from './BuilderTabIcon'

enum BuilderTabs {
  Builder,
  Design,
  Logic,
}

export const BuilderSidebar = (): JSX.Element => {
  const { activeTab, handleBuilderClick, handleDesignClick, handleLogicClick } =
    useBuilderPage()

  return (
    <Flex h="100%" bg="white">
      <Stack
        spacing="0.5rem"
        py="1rem"
        px="0.5rem"
        borderRight="1px solid"
        borderColor="neutral.300"
      >
        <BuilderTabIcon
          label="Build your form"
          icon={<BxsWidget fontSize="1.5rem" />}
          onClick={handleBuilderClick}
          isActive={activeTab === BuilderTabs.Builder}
        />
        <BuilderTabIcon
          label="Design your form"
          icon={<BxsColorFill fontSize="1.5rem" />}
          onClick={handleDesignClick}
          isActive={activeTab === BuilderTabs.Design}
        />
        <BuilderTabIcon
          label="Add conditional logic"
          icon={<BiGitMerge fontSize="1.5rem" />}
          onClick={handleLogicClick}
          isActive={activeTab === BuilderTabs.Logic}
        />
      </Stack>
      <BuilderDrawer>
        <BuilderDrawerContent />
      </BuilderDrawer>
    </Flex>
  )
}
