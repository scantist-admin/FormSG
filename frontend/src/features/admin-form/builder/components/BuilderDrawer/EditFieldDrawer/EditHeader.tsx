import { useForm } from 'react-hook-form'
import { Box, ButtonGroup, Divider, FormControl, Stack } from '@chakra-ui/react'

import Button from '~components/Button'
import FormErrorMessage from '~components/FormControl/FormErrorMessage'
import FormLabel from '~components/FormControl/FormLabel'
import Input from '~components/Input'
import Textarea from '~components/Textarea'
import { SectionFieldSchema } from '~templates/Field/Section/SectionFieldContainer'

export interface EditHeaderProps {
  field: SectionFieldSchema
}

interface EditHeaderInputs {
  title: string
  description: string
}

export const EditHeader = ({ field }: EditHeaderProps): JSX.Element => {
  const {
    register,
    formState: { isValid, isSubmitting, errors },
  } = useForm<EditHeaderInputs>({
    defaultValues: {
      title: field.title,
      description: field.description,
    },
  })

  return (
    <Box>
      <Stack spacing="2rem" divider={<Divider />}>
        <FormControl
          isRequired
          isReadOnly={isValid && isSubmitting}
          isInvalid={!!errors.title}
        >
          <FormLabel>Section header title</FormLabel>
          <Input {...register('title')} />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isReadOnly={isValid && isSubmitting}
          isInvalid={!!errors.title}
        >
          <FormLabel>Description</FormLabel>
          <Textarea {...register('description')} />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <ButtonGroup justifyContent="end">
          <Button variant="outline">Cancel</Button>
          <Button minW="8rem">Save</Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
}
