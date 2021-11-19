import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { RESET, useResetAtom } from 'jotai/utils'

import { FormFieldWithId } from '~shared/types/field'

import { fieldAtomFamily } from '~features/admin-form/builder/atoms'

type ChildrenProps<T extends FormFieldWithId> = {
  fieldData: T
  setFieldData: (update: typeof RESET | T | ((prev: T) => T)) => void
}

export interface EditContentContainerProps<T extends FormFieldWithId> {
  field: T
  children: (api: ChildrenProps<T>) => React.ReactElement
}

export const EditContentContainer = <T extends FormFieldWithId>({
  field,
  children,
}: EditContentContainerProps<T>): JSX.Element => {
  // Cast is necessary as TypeScript does not accept higher level generics.
  const [fieldData, setFieldData] = useAtom(fieldAtomFamily(field)) as [
    ChildrenProps<T>['fieldData'],
    ChildrenProps<T>['setFieldData'],
  ]
  const resetFieldData = useResetAtom(fieldAtomFamily(field))

  useEffect(() => {
    return () => {
      // Prevent memory leaks, see https://jotai.org/docs/api/utils#caveat:-memory-leaks
      fieldAtomFamily.remove(field)
      resetFieldData()
    }
  }, [field, resetFieldData])

  return children({ fieldData, setFieldData })
}
