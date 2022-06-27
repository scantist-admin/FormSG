import { useForm } from 'react-hook-form'
import { BiMenuAltLeft, BiPlus } from 'react-icons/bi'
import {
  Flex,
  FlexProps,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'

import { useIsMobile } from '~hooks/useIsMobile'
import { WORKSPACE_TITLE_VALIDATION_RULES } from '~utils/workspaceValidation'
import Button from '~components/Button'
import FormErrorMessage from '~components/FormControl/FormErrorMessage'
import IconButton from '~components/IconButton'
import Input from '~components/Input'

interface WorkspaceMenuHeaderProps extends FlexProps {
  shouldShowAddWorkspaceButton?: boolean
  onMenuClick?: () => void
}

type CreateWorkspaceInputProps = {
  title: string
}

export const WorkspaceMenuHeader = ({
  shouldShowAddWorkspaceButton = true,
  onMenuClick,
  ...props
}: WorkspaceMenuHeaderProps): JSX.Element => {
  const isMobile = useIsMobile()
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateWorkspaceInputProps>({
    defaultValues: {
      title: '',
    },
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modalSize = useBreakpointValue({
    base: 'mobile',
    xs: 'mobile',
    md: 'md',
  })

  // TODO (hans): Implement create workspace functionality
  const handleCreateWorkspace = handleSubmit((data) => {
    onClose()
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create workspace</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textStyle="subhead-1">Workspace name</Text>
            <FormControl isRequired isInvalid={!!errors.title}>
              <Input
                mt="0.75rem"
                autoFocus
                {...register('title', WORKSPACE_TITLE_VALIDATION_RULES)}
              />
              <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Stack
              w="100vw"
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: '2rem', md: '1rem' }}
              gap={{ base: '1rem', md: 'inherit' }}
              flexDir={{ base: 'column-reverse', md: 'inherit' }}
              justifyContent="flex-end"
            >
              <Button onClick={onClose} variant="clear" colorScheme="secondary">
                Cancel
              </Button>
              <Button onClick={handleCreateWorkspace}>Create workspace</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

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

        {shouldShowAddWorkspaceButton && (
          <IconButton
            size="sm"
            h="1.5rem"
            w="1.5rem"
            aria-label="Create new workspace"
            variant="clear"
            colorScheme="secondary"
            onClick={onOpen}
            icon={<BiPlus />}
            justifySelf="flex-end"
          />
        )}
      </Flex>
    </>
  )
}
