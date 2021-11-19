import { atomFamily, atomWithReset } from 'jotai/utils'

import { FormFieldWithId } from '~shared/types/field'

export const fieldAtomFamily = atomFamily(
  (field: FormFieldWithId) => atomWithReset(field),
  (a: FormFieldWithId, b: FormFieldWithId) => a._id === b._id,
)
