import {
  differenceInDays,
  differenceInWeeks,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import dayjs from 'dayjs'

import { FirstDayOfWeek } from './types'

interface FormatLabelBaseArgs {
  date: Date
  locale: string
}
interface FormatDateLabelArgs extends FormatLabelBaseArgs {
  format: string
}

interface FormatMonthLabelArgs extends FormatLabelBaseArgs {
  abbreviate?: boolean
}

const formatDateLabel = ({ date, locale, format }: FormatDateLabelArgs) => {
  return dayjs(date).locale(locale).format(format)
}

export const formatMonthLabel = ({
  date,
  locale,
  abbreviate,
}: FormatMonthLabelArgs) => {
  const format = abbreviate ? 'MMM' : 'MMMM'
  return formatDateLabel({ date, locale, format })
}

export const formatYearLabel = ({ date, locale }: FormatLabelBaseArgs) => {
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

export const getMonthDays = (
  month: Date,
  firstDayOfWeek: FirstDayOfWeek = 0,
): Date[][] => {
  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(month)
  const endDate = endOfWeek(monthEnd, { weekStartsOn: firstDayOfWeek })
  const date = startOfWeek(monthStart, { weekStartsOn: firstDayOfWeek })
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
  firstDayOfWeek: FirstDayOfWeek = 0,
  format = 'dd',
) => {
  const names: string[] = []
  const date = startOfWeek(new Date(), { weekStartsOn: firstDayOfWeek })

  for (let i = 0; i < 7; i += 1) {
    names.push(dayjs(date).locale(locale).format(format))
    date.setDate(date.getDate() + 1)
  }

  return names
}

export const getTodayOffset = (firstDayOfWeek: FirstDayOfWeek) => {
  const today = new Date()
  const monthStart = startOfMonth(today)
  const firstDateInCalendar = startOfWeek(monthStart, {
    weekStartsOn: firstDayOfWeek,
  })
  const weekOffset = differenceInWeeks(today, firstDateInCalendar)
  const startOfWeekOffset = startOfWeek(today, {
    weekStartsOn: firstDayOfWeek,
  })
  const dayOffset = differenceInDays(today, startOfWeekOffset)

  return {
    startOfMonth: monthStart,
    weekOffset,
    dayOffset,
  }
}
