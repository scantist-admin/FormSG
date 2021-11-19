import { SectionFieldBase } from '~shared/types/field'

import { BaseSectionField } from '~templates/Field/Section'

import { FormBuilderField } from '~features/admin-form/builder/types'

import { BuilderFieldContainer } from './BuilderFieldContainer'

export interface SectionBuilderFieldProps {
  field: FormBuilderField<SectionFieldBase>
}

export const SectionBuilderField = ({
  field,
}: SectionBuilderFieldProps): JSX.Element => {
  return (
    <BuilderFieldContainer field={field}>
      {({ schema }) => <BaseSectionField schema={schema} />}
    </BuilderFieldContainer>
  )
}
