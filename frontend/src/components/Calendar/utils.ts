import dayjs from 'dayjs'

import { FirstDayOfWeek } from './types'

interface FormatDateLabelArgs {
  date: Date
  locale: string
  format: string
}

const formatDateLabel = ({ date, locale, format }: FormatDateLabelArgs) => {
  return dayjs(date).locale(locale).format(format)
}

export const formatMonthLabel = ({
  date,
  locale,
}: Omit<FormatDateLabelArgs, 'format'>) => {
  return formatDateLabel({ date, locale, format: 'MMMM' })
}

export const formatYearLabel = ({
  date,
  locale,
}: Omit<FormatDateLabelArgs, 'format'>) => {
  return formatDateLabel({ date, locale, format: 'YYYY' })
}

export const getMonthsNames = (locale: string, format = 'MMM') => {
  const names: string[] = []
  const date = new Date(2021, 0, 1)

  for (let i = 0; i < 12; i += 1) {
    names.push(dayjs(date).locale(locale).format(format))
    date.setMonth(date.getMonth() + 1)
  }

  return names
}

interface IsMonthInRangeArgs {
  date: Date
  minDate?: Date
  maxDate?: Date
}

export function isMonthInRange({ date, minDate, maxDate }: IsMonthInRangeArgs) {
  const hasMinDate = minDate instanceof Date
  const hasMaxDate = maxDate instanceof Date

  if (!hasMaxDate && !hasMinDate) {
    return true
  }

  const endOfMonth = dayjs(date).endOf('month')
  const startOfMonth = dayjs(date).startOf('month')
  const maxInRange = hasMaxDate ? startOfMonth.isBefore(maxDate) : true
  const minInRange = hasMinDate ? endOfMonth.isAfter(minDate) : true
  return maxInRange && minInRange
}

export const getDecadeRange = (year: number) => {
  const rounded = year - (year % 10) - 1
  const range: number[] = []
  for (let i = 0; i < 12; i += 1) {
    const rangeYear = rounded + i
    range.push(rangeYear)
  }

  return range
}

const getEndOfWeek = (
  date: Date,
  firstDayOfWeek: FirstDayOfWeek = 'monday',
) => {
  const value = new Date(date)
  const day = value.getDay()
  const isSunday = firstDayOfWeek === 'sunday'

  const clampToLastDay = 7 - (isSunday ? day + 1 : day)

  if ((isSunday && day !== 6) || day !== 0) {
    value.setDate(value.getDate() + clampToLastDay)
  }

  return value
}

const getStartOfWeek = (
  date: Date,
  firstDayOfWeek: FirstDayOfWeek = 'monday',
) => {
  const value = new Date(date)
  const day = value.getDay() || 7
  const isSunday = firstDayOfWeek === 'sunday'

  const clampToFirstDay = isSunday ? day : day - 1

  if ((isSunday && day !== 0) || day !== 1) {
    value.setHours(-24 * clampToFirstDay)
  }

  return value
}

export const getMonthDays = (
  month: Date,
  firstDayOfWeek: FirstDayOfWeek = 'monday',
): Date[][] => {
  const currentMonth = month.getMonth()
  const startOfMonth = new Date(month.getFullYear(), currentMonth, 1)
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)
  const endDate = getEndOfWeek(endOfMonth, firstDayOfWeek)
  const date = getStartOfWeek(startOfMonth, firstDayOfWeek)
  const weeks: Date[][] = []

  while (date <= endDate) {
    const days: Date[] = []

    for (let i = 0; i < 7; i += 1) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }

    weeks.push(days)
  }

  return weeks
}

export const getWeekdaysNames = (
  locale: string,
  firstDayOfWeek: FirstDayOfWeek = 'monday',
  format = 'dd',
) => {
  const names: string[] = []
  const date = getStartOfWeek(new Date(), firstDayOfWeek)

  for (let i = 0; i < 7; i += 1) {
    names.push(dayjs(date).locale(locale).format(format))
    date.setDate(date.getDate() + 1)
  }

  return names
}
