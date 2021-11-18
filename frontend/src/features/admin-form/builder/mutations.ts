import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import { adminFormKeys } from '../common/queries'

import { reorderSingleFormField } from './UpdateFormService'

export const useMutateAdminForm = () => {
  const { formId } = useParams()
  if (!formId) throw new Error('No formId provided')

  const adminFormKey = adminFormKeys.id(formId)

  const queryClient = useQueryClient()

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
        const previousFormState = queryClient.getQueryData(adminFormKey)
        // Return a context object with the snapshotted value
        return { previousFormState }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (_err, _newData, context) => {
        if (context?.previousFormState) {
          queryClient.setQueryData(adminFormKey, context.previousFormState)
        }
      },
    },
  )

  return { mutateReorderField }
}
