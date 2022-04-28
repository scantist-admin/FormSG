import { ModalBody, ModalHeader } from '@chakra-ui/react'

import { AddCollaboratorInput } from './AddCollaboratorInput'
import { CollaboratorList } from './CollaboratorList'

export const CollaboratorListScreen = (): JSX.Element => {
  return (
    <>
      <ModalHeader color="secondary.700">Manage collaborators</ModalHeader>
      <ModalBody whiteSpace="pre-line" pb="2rem">
        <AddCollaboratorInput />
        <CollaboratorList />
      </ModalBody>
    </>
  )
}