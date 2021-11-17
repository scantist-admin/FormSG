import { useCallback } from 'react'
import { Waypoint } from 'react-waypoint'
import { useDisclosure } from '@chakra-ui/react'

import { FormHeader } from '~templates/FormStartPage/FormHeader'
import { MiniHeader } from '~templates/FormStartPage/MiniHeader'

import { usePublicFormContext } from '~features/public-form/PublicFormContext'
import { usePublicForm } from '~features/public-form/queries'

export const PublicFormHeader = (): JSX.Element => {
  const { miniHeaderRef } = usePublicFormContext()
  const { data } = usePublicForm()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handlePositionChange = useCallback(
    (pos: Waypoint.CallbackArgs) => {
      // Required so a page that loads in the middle of the page can still
      // trigger the mini header.
      if (pos.currentPosition === 'above') {
        onOpen()
      } else {
        onClose()
      }
    },
    [onClose, onOpen],
  )

  return (
    <>
      <MiniHeader
        ref={miniHeaderRef}
        isOpen={isOpen}
        startPage={data?.startPage}
        title={data?.title}
      />
      <FormHeader startPage={data?.startPage} title={data?.title} />
      {/* Sentinel to know when sticky navbar is starting */}
      <Waypoint topOffset="64px" onPositionChange={handlePositionChange} />
    </>
  )
}
