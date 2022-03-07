/**
 * This utility file contains immutable array functions.
 */

import { ExtractTypeFromArray } from '../types/utils'

/**
 * Pure function to reorders given array from given `fromIndex` to `toIndex`.
 * The new reordered array will be returned.
 *
 * If initial `fromIndex` is out of bounds of the original array, no reordering
 * will be performed and the initial array will be returned.
 *
 * @param array initial array to reorder
 * @param fromIndex the current index of the element to move
 * @param toIndex the new index to move the element to
 * @returns reordered array
 */
export const reorder = <T>(
  array: ExtractTypeFromArray<T>[],
  fromIndex: number,
  toIndex: number,
): ExtractTypeFromArray<T>[] => {
  /**
   * Invalid index, return array as is.
   * The index is checked instead of definedness of element at the index as
   * given array may contain undefined elements and will not be a comprehensive
   * validity check.
   */
  if (fromIndex < 0 || fromIndex >= array.length || fromIndex === toIndex) {
    return array
  }

  const copy = Array.from(array)
  const removed = copy.splice(fromIndex, 1)
  copy.splice(toIndex, 0, ...removed)

  return copy
}

/**
 * Pure function to replace element at given `index` with `newValue`.
 *
 * @param array initial array to replace element for
 * @param index index to replace element at
 * @param newValue the new value to replace with
 *
 * @return new array with replaced value
 */
export const replaceAt = <T>(
  array: ExtractTypeFromArray<T>[],
  index: number,
  newValue: ExtractTypeFromArray<T>,
): ExtractTypeFromArray<T>[] => {
  const ret = array.slice(0)
  ret[index] = newValue
  return ret
}
