import { useMemo } from 'react'
import { useAtomValue } from 'jotai/utils'
import { isEmpty } from 'lodash'

import { FormFieldWithId } from '~shared/types/field'

import { fieldAtomFamily } from '~features/admin-form/builder/atoms'

export interface BuilderFieldContainerProps<T extends FormFieldWithId> {
  field: T
  children: (api: { schema: T }) => React.ReactElement
}

export const BuilderFieldContainer = <T extends FormFieldWithId>({
  field,
  children,
}: BuilderFieldContainerProps<T>): JSX.Element => {
  const editFieldData = useAtomValue(fieldAtomFamily(field)) as T

  const schemaToUse = useMemo(() => {
    return isEmpty(editFieldData) ? field : editFieldData
  }, [editFieldData, field])

  return children({ schema: schemaToUse })
}
