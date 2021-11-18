import { nanoid } from 'nanoid'

import { BasicField } from '~shared/types/field'

import { DragItem } from '~features/admin-form/builder/types'

const ALL_FIELDS_ORDERED = [
  // Page section
  BasicField.Section,
  BasicField.Statement,
  BasicField.Image,
  // Fields section
  BasicField.ShortText,
  BasicField.LongText,
  BasicField.Radio,
  BasicField.Checkbox,
  BasicField.Mobile,
  BasicField.Email,
  BasicField.HomeNo,
  BasicField.Dropdown,
  BasicField.YesNo,
  BasicField.Rating,
  BasicField.Number,
  BasicField.Decimal,
  BasicField.Attachment,
  BasicField.Date,
  BasicField.Table,
  BasicField.Nric,
  BasicField.Uen,
]

export const generateDraggableFields = (): DragItem[] => {
  return ALL_FIELDS_ORDERED.map((fieldType) => ({
    id: nanoid(),
    fieldType,
  }))
}
