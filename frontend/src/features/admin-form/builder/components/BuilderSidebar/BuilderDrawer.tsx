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
    transition: {
      duration: 0.1,
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
          pos="relative"
          my="1rem"
          mx="1.5rem"
          as="aside"
          {...DRAWER_MOTION_PROPS}
        >
          <CloseButton
            pos="absolute"
            top={0}
            right={0}
            variant="clear"
            colorScheme="neutral"
            children={<BiX fontSize="1.5rem" />}
            onClick={handleClose}
          />
          <Box w="max-content">{children}</Box>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}
