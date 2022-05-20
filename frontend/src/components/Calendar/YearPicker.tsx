import { useMemo, useState } from 'react'
import { SimpleGrid } from '@chakra-ui/react'

import Button from '~components/Button'

import { CalendarHeader } from './CalendarHeader'
import { getDecadeRange } from './utils'

interface YearPickerProps {
  locale: string
  monthDate: Date
  onChange(value: number): void
  minYear?: number
  maxYear?: number
  nextDecadeLabel?: string
  previousDecadeLabel?: string
  preventFocus?: boolean
  onMonthLevel(): void
  onYearLevel(): void
}

export const YearPicker = ({
  locale,
  monthDate,
  minYear,
  maxYear,
  onChange,
  onMonthLevel,
  onYearLevel,
}: YearPickerProps): JSX.Element => {
  const initialYear = useMemo(() => monthDate.getFullYear(), [monthDate])
  const [decade, setDecade] = useState(initialYear)
  const range = useMemo(() => getDecadeRange(decade), [decade])
  return (
    <>
      <CalendarHeader
        hasPrevious={minYear ? minYear < range[0] : true}
        hasNext={maxYear ? maxYear > range[range.length - 1] : true}
        onNext={() => setDecade((current) => current + 10)}
        onPrevious={() => setDecade((current) => current - 10)}
        onYearLevel={onYearLevel}
        onMonthLevel={onMonthLevel}
        monthDate={monthDate}
        locale={locale}
      />
      <SimpleGrid columns={4}>
        {range.map((year) => (
          <Button
            variant={year === initialYear ? 'solid' : 'clear'}
            colorScheme={year === initialYear ? 'primary' : 'secondary'}
            key={year}
            onClick={() => onChange(year)}
            isDisabled={
              (!!minYear && year < minYear) || (!!maxYear && year > maxYear)
            }
          >
            {year}
          </Button>
        ))}
      </SimpleGrid>
    </>
  )
}
