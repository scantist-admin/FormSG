import { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import { AdminFormDto } from '~shared/types/form/form'

import { useToast } from '~hooks/useToast'

import { adminFormKeys } from '../common/queries'

import { reorderSingleFormField } from './UpdateFormService'

export const useMutateAdminForm = () => {
  const { formId } = useParams()
  if (!formId) throw new Error('No formId provided')

  const adminFormKey = adminFormKeys.id(formId)

  const queryClient = useQueryClient()
  const toast = useToast({ status: 'success', isClosable: true })

  const handleError = useCallback(
    (error: Error) => {
      toast.closeAll()
      toast({
        description: error.message,
        status: 'danger',
      })
    },
    [toast],
  )

  const mutateReorderField = useMutation(
    ({ fieldId, newPosition }: { fieldId: string; newPosition: number }) =>
      reorderSingleFormField(formId, fieldId, newPosition),
    {
      onMutate: async () => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(adminFormKey)
        // No need to update cache value due to updating list in FormBuilderContext
        // prior to calling this mutation.
        // Snapshot the previous value
        const previousFormState =
          queryClient.getQueryData<AdminFormDto>(adminFormKey)
        // Return a context object with the snapshotted value
        return { previousFormState }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err: Error, _newData, context) => {
        handleError(err)
        if (context?.previousFormState) {
          queryClient.setQueryData(adminFormKey, context.previousFormState)
        }
      },
    },
  )

  return { mutateReorderField }
}
