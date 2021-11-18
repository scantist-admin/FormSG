import { SectionFieldBase } from '~shared/types/field'

import { BaseSectionField } from '~templates/Field/Section'

import { FormBuilderField } from '~features/admin-form/builder/types'

export interface SectionBuilderFieldProps {
  field: FormBuilderField<SectionFieldBase>
}

export const SectionBuilderField = ({
  field,
}: SectionBuilderFieldProps): JSX.Element => {
  return <BaseSectionField schema={field} />
}
