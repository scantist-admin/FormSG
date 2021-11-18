import { memo } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Box, Flex } from '@chakra-ui/react'

import { BasicField } from '~shared/types/field'

import IconButton from '~components/IconButton'

import { FormBuilderField } from '~features/admin-form/builder/types'

import { useFormBuilder } from '../../FormBuilderScreen/FormBuilderContext'
import { BuilderDrawerCloseButton } from '../BuilderDrawerCloseButton'

import { EditHeader } from './EditHeader'

export const EditFieldDrawer = (): JSX.Element | null => {
  const { setCurrentSelectedField, currentSelectedField: field } =
    useFormBuilder()

  if (!field) return null

  return (
    <Box>
      <Flex
        pos="sticky"
        top={0}
        px="1.5rem"
        py="1rem"
        align="center"
        borderBottom="1px solid var(--chakra-colors-neutral-300)"
        bg="white"
      >
        <IconButton
          minH="1.5rem"
          minW="1.5rem"
          aria-label="Back to field selection"
          variant="clear"
          colorScheme="secondary"
          onClick={() => setCurrentSelectedField(null)}
          icon={<BiLeftArrowAlt />}
        />
        <Box m="auto">Edit {field.fieldType}</Box>
        <BuilderDrawerCloseButton />
      </Flex>
      <Flex flexDir="column">
        <MemoFieldDrawerContent field={field} />
      </Flex>
    </Box>
  )
}

const MemoFieldDrawerContent = memo(
  ({ field }: { field: FormBuilderField }) => {
    switch (field.fieldType) {
      case BasicField.Section:
        return <EditHeader field={field} />
      default:
        return <div>TODO: Insert field options here</div>
    }
  },
)
