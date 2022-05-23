import { isSameDay, isSameMonth, isWeekend } from 'date-fns'
import dayjs from 'dayjs'

import { DayModifiers } from '../../types'

const isOutside = (date: Date, month: Date) => {
  return !isSameMonth(date, month)
}

const isDayDisabled = ({
  minDate,
  maxDate,
  excludeDate,
  disableOutsideEvents,
  date,
  outside,
}: {
  date: Date
  minDate?: Date
  maxDate?: Date
  excludeDate?(date: Date): boolean
  disableOutsideEvents?: boolean
  outside?: boolean
}) => {
  const isAfterMax = !!maxDate && dayjs(maxDate).isBefore(date, 'day')
  const isBeforeMin = !!minDate && dayjs(minDate).isAfter(date, 'day')
  const shouldExclude = excludeDate?.(date) ?? false
  const disabledOutside = !!disableOutsideEvents && !!outside
  return isAfterMax || isBeforeMin || shouldExclude || disabledOutside
}

const getRangeProps = (date: Date, range?: [Date, Date]) => {
  const hasRange =
    Array.isArray(range) && range.every((val) => val instanceof Date)
  const inclusiveRange = hasRange && [
    dayjs(range[0]).subtract(1, 'day'),
    dayjs(range[1]).add(1, 'day'),
  ]

  const firstInRange = hasRange && isSameDay(date, range[0])
  const lastInRange = hasRange && isSameDay(date, range[1])
  const inRange =
    inclusiveRange &&
    dayjs(date).isAfter(inclusiveRange[0], 'day') &&
    dayjs(date).isBefore(inclusiveRange[1], 'day')

  return {
    firstInRange,
    lastInRange,
    inRange,
    selectedInRange: firstInRange || lastInRange,
  }
}

type GetDayPropsArgs = {
  /** Date associated with Day component */
  date: Date

  /** Month that is currently displayed */
  month: Date

  /** Min and max possible dates */
  maxDate?: Date
  minDate?: Date

  /** Currently selected date or an array of dates */
  value?: Date | Date[]

  /** Function to determine if date should be excluded */
  excludeDate?(date: Date): boolean

  /** Should outside events be disabled */
  disableOutsideEvents?: boolean

  /** Selected date range */
  range?: [Date, Date]
}

export const getDayProps = ({
  date,
  month,
  minDate,
  maxDate,
  value,
  excludeDate,
  disableOutsideEvents,
  range,
}: GetDayPropsArgs): DayModifiers => {
  const outside = isOutside(date, month)
  const selected = Array.isArray(value)
    ? value?.some((val) => isSameDay(val, date))
    : !!value && isSameDay(date, value)
  const { inRange, lastInRange, firstInRange, selectedInRange } = getRangeProps(
    date,
    range,
  )

  return {
    disabled: isDayDisabled({
      minDate,
      maxDate,
      excludeDate,
      disableOutsideEvents,
      date,
      outside,
    }),
    weekend: isWeekend(date),
    selectedInRange,
    selected,
    inRange,
    firstInRange,
    lastInRange,
    outside,
  }
}

export const getDayTabIndex = ({
  focusable,
  hasValue,
  selected,
  firstInMonth,
}: {
  focusable?: boolean
  hasValue: boolean
  selected: boolean
  firstInMonth: boolean
}) => {
  if (!focusable) {
    return -1
  }

  if (hasValue) {
    return selected ? 0 : -1
  }

  return firstInMonth ? 0 : -1
}
