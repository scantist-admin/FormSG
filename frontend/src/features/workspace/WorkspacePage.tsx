import { useMemo } from 'react'
import { BiPlus } from 'react-icons/bi'
import {
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'

import { ROLLOUT_ANNOUNCEMENT_KEY_PREFIX } from '~constants/localStorage'
import { useDraggable } from '~hooks/useDraggable'
import { useLocalStorage } from '~hooks/useLocalStorage'
import IconButton from '~components/IconButton'

import { RolloutAnnouncementModal } from '~features/rollout-announcement/RolloutAnnouncementModal'
import { useUser } from '~features/user/queries'
import { WorkspaceContent } from '~features/workspace/WorkspaceContent'

interface WorkspaceTabProps {
  label: string
  numForms: number
}

const WorkspaceTab = ({ label, numForms }: WorkspaceTabProps): JSX.Element => {
  return (
    <Tab justifyContent="flex-start">
      <Flex ml="1rem" pr="1rem" justifyContent="space-between" w="100%">
        <Text textStyle="body-2">{label}</Text>
        <Text textStyle="body-2">{numForms}</Text>
      </Flex>
    </Tab>
  )
}

export const WorkspacePage = (): JSX.Element => {
  const { user, isLoading: isUserLoading } = useUser()
  const { ref, onMouseDown } = useDraggable<HTMLDivElement>()

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

  // TODO (hans): Get totalFormCount and isLoading from GET workspaces API when it is implemented
  const totalFormCount = Math.round(Math.random())
  const isLoading = false

  // TODO (hans): Get workspaces data from workspace API once it's implemented
  const MOCK_WORKSPACES_DATA = [
    {
      _id: '1',
      title: 'General',
      numForms: 12,
    },
    {
      _id: '2',
      title: 'Product feedback',
      numForms: 100000,
    },
    {
      _id: '3',
      title: 'Public sentiment',
      numForms: 553,
    },
  ]

  // TODO (hans): Add <EmptyWorkspace/> if totalFormCount === 0
  return (
    <>
      <Tabs isLazy isManual orientation="vertical" variant="line">
        <Flex
          h="max-content"
          ref={ref}
          onMouseDown={onMouseDown}
          overflowX={{ base: 'auto', md: 'initial' }}
          position={{ base: 'fixed', md: 'sticky' }}
          zIndex={{ base: 'docked', md: 0 }}
          top={{ base: 0, md: '2rem' }}
          minW={{ base: 0, md: '15.5rem' }}
          w="auto"
          __css={{
            scrollbarWidth: 0,
            /* Scrollbar for Chrome, Safari, Opera and Microsoft Edge */
            '&::-webkit-scrollbar': {
              width: 0,
              height: 0,
            },
          }}
        >
          <Flex justifyContent="space-between" alignItems="center" px="2rem">
            <Text textStyle="h4" color="secondary.700">
              Workspaces
            </Text>
            <IconButton
              size="sm"
              h="1.5rem"
              w="1.5rem"
              aria-label="Create new workspace"
              variant="clear"
              colorScheme="secondary"
              onClick={() => null}
              icon={<BiPlus />}
            />
          </Flex>
          <TabList
            overflowX="initial"
            display="inline-flex"
            mt="0.75rem"
            w="100%"
          >
            {MOCK_WORKSPACES_DATA.map((workspace) => (
              <WorkspaceTab
                label={workspace.title}
                numForms={workspace.numForms}
              />
            ))}
          </TabList>
        </Flex>
        <TabPanels>
          {MOCK_WORKSPACES_DATA.map((workspace) => (
            <TabPanel>
              <WorkspaceContent workspaceId={workspace._id} />
            </TabPanel>
          ))}
        </TabPanels>
        <Spacer />
      </Tabs>
      <RolloutAnnouncementModal
        onClose={() => setHasSeenAnnouncement(true)}
        isOpen={isAnnouncementModalOpen}
      />
    </>
  )
}
