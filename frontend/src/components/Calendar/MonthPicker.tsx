import { useMemo } from 'react'
import { SimpleGrid } from '@chakra-ui/react'

import Button from '~components/Button'

import { CalendarHeader } from './CalendarHeader'
import { getMonthsNames, isMonthInRange } from './utils'

export interface MonthPickerProps {
  monthDate: Date
  onChange(value: number): void
  locale: string
  onYearChange(year: number): void
  onYearLevel(): void
  onMonthLevel(): void
  minDate?: Date
  maxDate?: Date
  nextYearLabel?: string
  previousYearLabel?: string
  preventFocus?: boolean
}

export const MonthPicker = ({
  monthDate,
  minDate,
  maxDate,
  onYearLevel,
  onMonthLevel,
  locale,
  onChange,
  onYearChange,
}: MonthPickerProps): JSX.Element => {
  const year = useMemo(() => monthDate.getFullYear(), [monthDate])
  const monthNames = useMemo(() => getMonthsNames(locale), [locale])
  const activeMonth = useMemo(() => monthDate.getMonth(), [monthDate])

  const hasNextYear = useMemo(
    () => (minDate ? year < minDate.getFullYear() : true),
    [minDate, year],
  )
  const hasPreviousYear = useMemo(
    () => (maxDate ? year > maxDate.getFullYear() : true),
    [maxDate, year],
  )

  return (
    <>
      <CalendarHeader
        onMonthLevel={onMonthLevel}
        onYearLevel={onYearLevel}
        monthDate={monthDate}
        locale="en"
        hasNext={hasNextYear}
        hasPrevious={hasPreviousYear}
        onNext={() => onYearChange(year + 1)}
        onPrevious={() => onYearChange(year - 1)}
      />
      <SimpleGrid columns={3}>
        {monthNames.map((monthName, index) => (
          <Button
            variant={activeMonth === index ? 'solid' : 'clear'}
            colorScheme={activeMonth === index ? 'primary' : 'secondary'}
            key={monthName}
            onClick={() => onChange(index)}
            isDisabled={
              !isMonthInRange({ date: new Date(year, index), minDate, maxDate })
            }
          >
            {monthName}
          </Button>
        ))}
      </SimpleGrid>
    </>
  )
}
