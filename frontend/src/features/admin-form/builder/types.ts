import { BasicField } from '~shared/types/field'

export enum BuilderTabs {
  Builder,
  Design,
  Logic,
}

export type DragItem = {
  id: string
  fieldType: BasicField
}

export enum FieldDropType {
  Create,
  Reorder,
}
