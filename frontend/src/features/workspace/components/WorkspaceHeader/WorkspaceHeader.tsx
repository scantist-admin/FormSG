import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import {
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'

import Button from '~components/Button'

import { SortOption } from '~features/workspace/types'

import CreateFormModal from '../CreateFormModal'
import { CreateFormWizardProvider } from '../CreateFormModal/CreateFormWizardContext'

import { WorkspaceSortDropdown } from './WorkspaceSortDropdown'

export interface WorkspaceHeaderProps {
  /**
   * Number of forms in the workspace.
   * Defaults to '---' (to account for loading or error states)
   */
  totalFormCount?: number | '---'
  isLoading: boolean
}

/**
 * Header for listing number of forms, or updating the sort order of listed forms, etc.
 */
export const WorkspaceHeader = ({
  totalFormCount = '---',
  isLoading,
}: WorkspaceHeaderProps): JSX.Element => {
  const [sortOption, setSortOption] = useState(SortOption.LastUpdated)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useBreakpointValue({
    base: true,
    xs: true,
    md: false,
  })

  return (
    <>
      <CreateFormWizardProvider>
        <CreateFormModal isOpen={isOpen} onClose={onClose} />
      </CreateFormWizardProvider>
      <Stack justify="space-between" direction={{ base: 'column', md: 'row' }}>
        <Text
          flex={1}
          as="h2"
          textStyle="h2"
          display="flex"
          color="secondary.500"
          my="0.75rem"
        >
          All forms (<Skeleton isLoaded={!isLoading}>{totalFormCount}</Skeleton>
          )
        </Text>
        <Stack
          spacing="1rem"
          direction={{ base: 'column', md: 'row' }}
          h="fit-content"
        >
          <WorkspaceSortDropdown
            value={sortOption}
            onChange={setSortOption}
            isDisabled={isLoading}
          />
          <Button
            isFullWidth={isMobile}
            isDisabled={isLoading}
            onClick={onOpen}
            leftIcon={<BiPlus fontSize="1.5rem" />}
          >
            Create form
          </Button>
        </Stack>
      </Stack>
    </>
  )
}