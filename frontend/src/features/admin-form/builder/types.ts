import { FormField, FormFieldWithId } from '~shared/types/field'

export enum BuilderTabs {
  Builder,
  Design,
  Logic,
}

export type FormBuilderField<T = FormField> = FormFieldWithId<T> & {
  // Extra id key used for dndkit sorting.
  id: string
}

export type DragItem = {
  id: string
  fieldType: FormField['fieldType']
  isCreate?: boolean
}

export enum FieldDropType {
  Create,
  Reorder,
}
