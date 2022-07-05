import { useMemo, useState } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { ROLLOUT_ANNOUNCEMENT_KEY_PREFIX } from '~constants/localStorage'
import { useIsMobile } from '~hooks/useIsMobile'
import { useLocalStorage } from '~hooks/useLocalStorage'
import IconButton from '~components/IconButton'

import { RolloutAnnouncementModal } from '~features/rollout-announcement/RolloutAnnouncementModal'
import { useUser } from '~features/user/queries'
import { WorkspaceContent } from '~features/workspace/WorkspaceContent'

import { EmptyWorkspace } from './components/EmptyWorkspace'
import { WorkspaceMenuHeader } from './components/WorkspaceSideMenu/WorkspaceMenuHeader'
import { WorkspaceMenuTabs } from './components/WorkspaceSideMenu/WorkspaceMenuTabs'
import { useDashboard, useWorkspace } from './queries'

export const WorkspacePage = (): JSX.Element => {
  const [currWorkspaceId, setCurrWorkspaceId] = useState<string>('')

  const isMobile = useIsMobile()
  const createFormModalDisclosure = useDisclosure()
  const mobileDrawer = useDisclosure()

  const { user, isLoading: isUserLoading } = useUser()
  const { data: dashboardForms, isLoading: isDashboardLoading } = useDashboard()
  const { data: workspaces, isLoading: isWorkspaceLoading } = useWorkspace()

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

  if (dashboardForms?.length === 0) {
    return (
      <EmptyWorkspace
        isLoading={isDashboardLoading}
        handleOpenCreateFormModal={createFormModalDisclosure.onOpen}
      />
    )
  }

  if (isWorkspaceLoading || !workspaces) return <></>

  return (
    <>
      <Drawer
        placement="left"
        onClose={mobileDrawer.onClose}
        isOpen={mobileDrawer.isOpen}
      >
        <DrawerOverlay />
        <DrawerContent maxW="15.5rem">
          <DrawerHeader p={0}>
            <Flex pt="1rem" px="1rem" alignItems="center">
              <IconButton
                icon={<BiMenuAltLeft />}
                onClick={mobileDrawer.onClose}
                aria-label="close workspace drawer"
                variant="clear"
                colorScheme="secondary"
              />
              <WorkspaceMenuHeader mt={0} px={0} w="100%" />
            </Flex>
          </DrawerHeader>
          <DrawerBody px={0} pt="1rem">
            <WorkspaceMenuTabs
              workspaces={workspaces}
              currWorkspace={currWorkspaceId}
              onClick={(id) => {
                setCurrWorkspaceId(id)
                mobileDrawer.onClose()
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Grid
        templateColumns={{ base: 'inherit', lg: '15.5rem 1fr' }}
        minH="100vh"
      >
        {isMobile ? (
          <Flex
            pl={'1.25rem'}
            alignItems="center"
            borderBottomWidth="1px"
            borderBottomColor="neutral.300"
            py="0.5rem"
          >
            <IconButton
              icon={<BiMenuAltLeft />}
              onClick={mobileDrawer.onOpen}
              aria-label="open workspace drawer"
              variant="clear"
              colorScheme="secondary"
            />
            <Text textStyle="h4" color="secondary.700">
              Workspaces
            </Text>
          </Flex>
        ) : (
          <Stack borderRight="1px" borderRightColor="neutral.300">
            <WorkspaceMenuHeader />
            <WorkspaceMenuTabs
              workspaces={workspaces}
              currWorkspace={currWorkspaceId}
              onClick={setCurrWorkspaceId}
            />
          </Stack>
        )}
        <WorkspaceContent workspaceId={currWorkspaceId} />
      </Grid>

      <RolloutAnnouncementModal
        onClose={() => setHasSeenAnnouncement(true)}
        isOpen={isAnnouncementModalOpen}
      />
    </>
  )
}
