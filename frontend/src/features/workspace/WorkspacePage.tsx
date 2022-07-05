import { useMemo } from 'react'
import { Grid, useDisclosure } from '@chakra-ui/react'

import { ROLLOUT_ANNOUNCEMENT_KEY_PREFIX } from '~constants/localStorage'
import { useLocalStorage } from '~hooks/useLocalStorage'

import { RolloutAnnouncementModal } from '~features/rollout-announcement/RolloutAnnouncementModal'
import { useUser } from '~features/user/queries'

import { EmptyWorkspace } from './components/EmptyWorkspace'
import { WorkspaceContent } from './WorkspaceContent'

export const WorkspacePage = (): JSX.Element => {
  const { user, isLoading: isUserLoading } = useUser()

  const ROLLOUT_ANNOUNCEMENT_KEY = useMemo(
    () => ROLLOUT_ANNOUNCEMENT_KEY_PREFIX + user?._id,
    [user],
  )
  const [hasSeenAnnouncement, setHasSeenAnnouncement] =
    useLocalStorage<boolean>(ROLLOUT_ANNOUNCEMENT_KEY)

  const isAnnouncementModalOpen = useMemo(
    () => !isUserLoading && !hasSeenAnnouncement,
    [isUserLoading, hasSeenAnnouncement],
  )

  const createFormModalDisclosure = useDisclosure()
  // TODO (hans): Get totalFormCount and isLoading from GET workspaces API when it is implemented
  const totalFormCount = Math.round(Math.random())
  const isLoading = false

  return (
    <>
      {totalFormCount === 0 ? (
        <EmptyWorkspace
          handleOpenCreateFormModal={createFormModalDisclosure.onOpen}
          isLoading={isLoading}
        />
      ) : (
        <Grid
          bg="neutral.100"
          templateColumns="1fr"
          templateRows="auto 1fr auto"
          minH="100vh"
          templateAreas="'header' 'main' 'footer'"
        >
          <WorkspaceContent />
          <RolloutAnnouncementModal
            onClose={() => setHasSeenAnnouncement(true)}
            isOpen={isAnnouncementModalOpen}
          />
        </Grid>
      )}
    </>
  )
}
