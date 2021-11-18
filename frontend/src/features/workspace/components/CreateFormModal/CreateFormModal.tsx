import { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  useBreakpointValue,
  UseDisclosureReturn,
} from '@chakra-ui/react'

import { ModalCloseButton } from '~components/Modal'
import { MotionBox } from '~components/motion'

import { CreateFormDetailsScreen } from './CreateFormDetailsScreen'
import {
  CreateFormFlowStates,
  useCreateFormWizard,
} from './CreateFormWizardContext'
import { SaveSecretKeyScreen } from './SaveSecretKeyScreen'

export type CreateFormModalProps = Pick<
  UseDisclosureReturn,
  'onClose' | 'isOpen'
>

const SCREEN_ANIMATION_VARIANT = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    x: 0,
    opacity: 1,
  },
}

/**
 * @preconditions Requires CreateFormWizardProvider parent
 */
export const CreateFormModal = ({
  isOpen,
  onClose,
}: CreateFormModalProps): JSX.Element => {
  const { resetModal } = useCreateFormWizard()
  const modalSize = useBreakpointValue({
    base: 'mobile',
    xs: 'mobile',
    md: 'full',
  })

  const handleCloseModal = () => {
    resetModal()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size={modalSize}>
      <ModalContent py={{ base: 'initial', md: '4.5rem' }}>
        <ModalCloseButton />
        <ScreenContent />
      </ModalContent>
    </Modal>
  )
}

/**
 * Display screen content depending on the current step (with animation).
 */
const ScreenContent = () => {
  const { direction, currentStep } = useCreateFormWizard()
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  // So animation does not run on first load.
  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false)
    }
  }, [isFirstLoad])

  return (
    <MotionBox
      key={currentStep}
      custom={direction}
      variants={SCREEN_ANIMATION_VARIANT}
      initial={isFirstLoad ? 'center' : 'enter'}
      animate="center"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      {currentStep === CreateFormFlowStates.Details && (
        <CreateFormDetailsScreen />
      )}
      {currentStep === CreateFormFlowStates.Landing && <SaveSecretKeyScreen />}
    </MotionBox>
  )
}