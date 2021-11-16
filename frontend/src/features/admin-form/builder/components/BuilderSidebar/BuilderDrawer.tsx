import { BiX } from 'react-icons/bi'
import { Box, CloseButton } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import { MotionBox } from '~components/motion'

import { useBuilderPage } from '../../BuilderPageContext'

export interface BuilderDrawerProps {
  children: React.ReactNode
}

const DRAWER_MOTION_PROPS = {
  initial: { width: 0 },
  animate: {
    width: 300,
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

export const BuilderDrawer = ({
  children,
}: BuilderDrawerProps): JSX.Element => {
  const { isShowDrawer, handleClose } = useBuilderPage()

  return (
    <AnimatePresence>
      {isShowDrawer && (
        <MotionBox
          key="sidebar"
          pos="relative"
          as="aside"
          {...DRAWER_MOTION_PROPS}
        >
          <CloseButton
            key="closebutton"
            pos="absolute"
            top="1rem"
            right="1.5rem"
            fontSize="1.5rem"
            w="1.5rem"
            h="1.5rem"
            variant="clear"
            colorScheme="neutral"
            children={<BiX />}
            onClick={handleClose}
          />
          <Box w="100%" minW="max-content">
            {children}
          </Box>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}
