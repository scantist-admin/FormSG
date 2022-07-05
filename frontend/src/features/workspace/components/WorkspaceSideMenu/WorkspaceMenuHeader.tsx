import { BiMenuAltLeft, BiPlus } from 'react-icons/bi'
import { Flex, FlexProps, Text } from '@chakra-ui/react'

import { useIsMobile } from '~hooks/useIsMobile'
import IconButton from '~components/IconButton'

interface WorkspaceMenuHeaderProps extends FlexProps {
  shouldShowAddWorkspaceModal?: boolean
  onMenuClick?: () => void
}

export const WorkspaceMenuHeader = ({
  shouldShowAddWorkspaceModal = true,
  onMenuClick,
  ...props
}: WorkspaceMenuHeaderProps): JSX.Element => {
  const isMobile = useIsMobile()

  return (
    <Flex
      justifyContent={{ base: 'inherit', md: 'space-between' }}
      px={{ base: '1.5rem', md: '2rem' }}
      mt={{ base: 0, md: '1.5rem' }}
      {...props}
      alignItems="center"
    >
      <Flex alignItems="center">
        {isMobile && (
          <IconButton
            icon={<BiMenuAltLeft />}
            onClick={() => onMenuClick && onMenuClick()}
            aria-label="open workspace drawer"
            variant="clear"
            colorScheme="secondary"
          />
        )}
        <Text textStyle="h4" color="secondary.700">
          Workspaces
        </Text>
      </Flex>

      {shouldShowAddWorkspaceModal && (
        <IconButton
          size="sm"
          h="1.5rem"
          w="1.5rem"
          aria-label="Create new workspace"
          variant="clear"
          colorScheme="secondary"
          // TODO (hans): Implement add workspace modal view
          onClick={() => null}
          icon={<BiPlus />}
          justifySelf="flex-end"
        />
      )}
    </Flex>
  )
}
