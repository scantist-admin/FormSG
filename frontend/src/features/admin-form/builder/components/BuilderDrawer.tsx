import { useState } from 'react'
import { BiGitMerge, BiX } from 'react-icons/bi'
import { Box, CloseButton, Flex, Stack, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import { BxsColorFill } from '~assets/icons/BxsColorFill'
import { BxsWidget } from '~assets/icons/BxsWidget'
import IconButton from '~components/IconButton'
import { MotionBox } from '~components/motion'
import Tooltip from '~components/Tooltip'

interface BuilderTabIconProps {
  icon: React.ReactElement
  onClick: () => void
  label: string
  isActive: boolean
}
const BuilderTabIcon = ({
  icon,
  onClick,
  label,
  isActive,
}: BuilderTabIconProps) => {
  return (
    <Tooltip label={label} placement="right">
      <IconButton
        aria-label={label}
        variant="reverse"
        isActive={isActive}
        icon={icon}
        onClick={onClick}
      />
    </Tooltip>
  )
}

enum BuilderTabs {
  Builder,
  Design,
  Logic,
}

export const BuilderDrawer = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<BuilderTabs | null>(null)

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
          onClick={() => setActiveTab(BuilderTabs.Builder)}
          isActive={activeTab === BuilderTabs.Builder}
        />
        <BuilderTabIcon
          label="Design your form"
          icon={<BxsColorFill fontSize="1.5rem" />}
          onClick={() => setActiveTab(BuilderTabs.Design)}
          isActive={activeTab === BuilderTabs.Design}
        />
        <BuilderTabIcon
          label="Add conditional logic"
          icon={<BiGitMerge fontSize="1.5rem" />}
          onClick={() => setActiveTab(BuilderTabs.Logic)}
          isActive={activeTab === BuilderTabs.Logic}
        />
      </Stack>
      <AnimatePresence>
        {activeTab !== null && (
          <MotionBox
            pos="relative"
            my="1rem"
            mx="1.5rem"
            as="aside"
            initial={{ width: 0 }}
            animate={{
              width: 300,
              transition: {
                bounce: 0,
                duration: 0.2,
              },
            }}
            exit={{
              width: 0,
              transition: {
                duration: 0.1,
              },
            }}
          >
            <CloseButton
              pos="absolute"
              top={0}
              right={0}
              variant="clear"
              colorScheme="neutral"
              children={<BiX fontSize="1.5rem" />}
              onClick={() => setActiveTab(null)}
            />
            <Box w="max-content">
              <Text textStyle="subhead-3" color="secondary.500">
                Builder
              </Text>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Flex>
  )
}
