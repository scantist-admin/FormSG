import { BasicField } from '~shared/types/field'

export enum BuilderTabs {
  Builder,
  Design,
  Logic,
}

export type DragItem = {
  id: string
  fieldType: BasicField
  isCreate?: boolean
}

export enum FieldDropType {
  Create,
  Reorder,
}
