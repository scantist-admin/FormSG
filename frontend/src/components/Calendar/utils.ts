import dayjs from 'dayjs'

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
