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
