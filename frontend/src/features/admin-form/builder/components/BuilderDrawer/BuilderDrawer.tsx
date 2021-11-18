import { Box } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import { MotionBox } from '~components/motion'

import { useBuilderPage } from '../../BuilderPageContext'

import { BuilderDrawerContent } from './BuilderDrawerContent'

const DRAWER_MOTION_PROPS = {
  initial: { width: 0 },
  animate: {
    maxWidth: '33.25rem',
    width: '36%',
    transition: {
      bounce: 0,
      duration: 0.2,
    },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

export const BuilderDrawer = (): JSX.Element => {
  const { isShowDrawer } = useBuilderPage()

  return (
    <AnimatePresence>
      {isShowDrawer && (
        <MotionBox
          bg="white"
          key="sidebar"
          pos="relative"
          as="aside"
          overflow="auto"
          {...DRAWER_MOTION_PROPS}
        >
          <Box w="100%" h="100%" minW="max-content">
            <BuilderDrawerContent />
          </Box>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}
