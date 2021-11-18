import { omit } from 'lodash'

import { DragItem } from '~features/admin-form/builder/types'

/**
 * Removes `isCreate` key from dragItem.
 */
export const removeIsCreate = (
  dragItem: DragItem,
): Omit<DragItem, 'isCreate'> => {
  return omit(dragItem, 'isCreate')
}
