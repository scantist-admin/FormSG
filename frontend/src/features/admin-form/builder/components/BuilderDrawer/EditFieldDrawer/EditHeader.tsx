import { Controller, useForm } from 'react-hook-form'
import { ButtonGroup, Divider, FormControl, Stack } from '@chakra-ui/react'

import Button from '~components/Button'
import FormErrorMessage from '~components/FormControl/FormErrorMessage'
import FormLabel from '~components/FormControl/FormLabel'
import Input from '~components/Input'
import Textarea from '~components/Textarea'
import { SectionFieldSchema } from '~templates/Field/Section/SectionFieldContainer'

import { EditContentContainer } from './EditContentContainer'

export interface EditHeaderProps {
  field: SectionFieldSchema
}

interface EditHeaderInputs {
  title: string
  description: string
}

export const EditHeader = ({ field }: EditHeaderProps): JSX.Element => {
  const {
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm<EditHeaderInputs>({
    defaultValues: {
      title: field.title,
      description: field.description,
    },
  })

  return (
    <EditContentContainer field={field}>
      {({ fieldData, setFieldData }) => (
        <Stack spacing="2rem" divider={<Divider />}>
          <FormControl
            isRequired
            isReadOnly={isValid && isSubmitting}
            isInvalid={!!errors.title}
          >
            <FormLabel>Section header title</FormLabel>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, ...rest } }) => (
                <Input
                  onChange={(e) => {
                    onChange(e)
                    setFieldData({
                      ...fieldData,
                      title: e.target.value,
                    })
                  }}
                  {...rest}
                />
              )}
            />
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
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, ...rest } }) => (
                <Textarea
                  onChange={(e) => {
                    onChange(e)
                    setFieldData({
                      ...fieldData,
                      description: e.target.value,
                    })
                  }}
                  {...rest}
                />
              )}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <ButtonGroup justifyContent="end">
            <Button variant="outline">Cancel</Button>
            <Button minW="8rem">Save</Button>
          </ButtonGroup>
        </Stack>
      )}
    </EditContentContainer>
  )
}
