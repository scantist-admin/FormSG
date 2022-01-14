import { useCallback, useMemo } from 'react'
import { Box, Flex, Spacer } from '@chakra-ui/react'

import { FormAuthType, FormColorTheme } from '~shared/types/form/form'

import { usePublicFormView } from '~features/public-form/queries'

import { FormAuth } from '../FormAuth'

import { FormFields } from './FormFields'
import { FormFieldsSkeleton } from './FormFieldsSkeleton'
import { FormSectionsProvider } from './FormSectionsContext'
import { SectionSidebar } from './SectionSidebar'

export const FormFieldsContainer = (): JSX.Element => {
  const { data, isLoading } = usePublicFormView()

  const onSubmit = useCallback((values: Record<string, string>) => {
    console.log(values)
  }, [])

  const bgColour = useMemo(() => {
    if (isLoading) return 'neutral.100'
    if (!data?.form) return ''
    const { colorTheme } = data.form.startPage
    switch (colorTheme) {
      case FormColorTheme.Blue:
        return 'secondary.100'
      default:
        return `theme-${colorTheme}.100`
    }
  }, [data, isLoading])

  const isAuthRequired = useMemo(
    () => data && data.form.authType !== FormAuthType.NIL && !data.spcpSession,
    [data],
  )

  const renderFields = useMemo(() => {
    // Render skeleton when no data
    if (isLoading) {
      return <FormFieldsSkeleton />
    }

    if (!data) {
      // TODO: Add/redirect to error page
      return <div>Something went wrong</div>
    }

    // Redundant conditional for type narrowing
    if (isAuthRequired && data.form.authType !== FormAuthType.NIL) {
      return <FormAuth authType={data.form.authType} />
    }

    return (
      <FormFields
        formFields={data.form.form_fields}
        colorTheme={data.form.startPage.colorTheme}
        onSubmit={onSubmit}
      />
    )
  }, [data, isAuthRequired, isLoading, onSubmit])

  return (
    <FormSectionsProvider>
      <Flex bg={bgColour} flex={1} justify="center" p="1.5rem">
        {isAuthRequired ? null : <SectionSidebar />}
        <Box
          bg="white"
          p="2.5rem"
          w="100%"
          minW={0}
          h="fit-content"
          maxW="57rem"
        >
          {renderFields}
        </Box>
        {isAuthRequired ? null : <Spacer />}
      </Flex>
    </FormSectionsProvider>
  )
}