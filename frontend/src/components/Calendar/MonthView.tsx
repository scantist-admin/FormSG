import { Box } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { CalendarHeader } from './CalendarHeader'
import { Month } from './Month'
import { DayKeydownPayload, MonthSettings } from './types'
import { isMonthInRange } from './utils'

interface MonthViewProps extends MonthSettings {
  locale: string
  amountOfMonths: number
  monthDate: Date
  allowLevelChange: boolean
  daysRefs: React.RefObject<HTMLButtonElement[][][]>
  onMonthChange(month: Date): void
  onMonthLevel(): void
  onYearLevel(): void
  onDayKeyDown(
    monthIndex: number,
    payload: DayKeydownPayload,
    event: React.KeyboardEvent<HTMLButtonElement>,
  ): void
  nextMonthLabel?: string
  previousMonthLabel?: string
  labelFormat?: string
  weekdayLabelFormat?: string
  renderDay?(date: Date): React.ReactNode
  /** Selected date or an array of selected dates */
  value?: Date | Date[]
  /** Selected range */
  range?: [Date, Date]
  /** Called when day is selected */
  onChange?(value: Date): void
  /** Called when onMouseEnter event fired on day button */
  onDayMouseEnter?(date: Date, event: React.MouseEvent): void
}

export const MonthView = ({
  locale,
  monthDate,
  onMonthLevel,
  onYearLevel,
  daysRefs,
  onDayKeyDown,
  minDate,
  maxDate,
  amountOfMonths,
  onMonthChange,
  nextMonthLabel,
  previousMonthLabel,
  preventFocus,
  renderDay,
  weekdayLabelFormat,
  ...rest
}: MonthViewProps): JSX.Element => {
  const nextMonth = dayjs(monthDate).add(amountOfMonths, 'months').toDate()
  const previousMonth = dayjs(monthDate).subtract(1, 'months').toDate()

  const months = Array(amountOfMonths)
    .fill(0)
    .map((_, index) => {
      const calMonthDate = dayjs(monthDate).add(index, 'months').toDate()
      return (
        <Box key={index}>
          <CalendarHeader
            locale={locale}
            monthDate={calMonthDate}
            hasNext={
              index + 1 === amountOfMonths &&
              isMonthInRange({ date: nextMonth, minDate, maxDate })
            }
            hasPrevious={
              index === 0 &&
              isMonthInRange({ date: previousMonth, minDate, maxDate })
            }
            onNext={() =>
              onMonthChange(
                dayjs(monthDate).add(amountOfMonths, 'months').toDate(),
              )
            }
            onPrevious={() =>
              onMonthChange(
                dayjs(monthDate).subtract(amountOfMonths, 'months').toDate(),
              )
            }
            onMonthLevel={onMonthLevel}
            onYearLevel={onYearLevel}
            nextLabel={nextMonthLabel}
            previousLabel={previousMonthLabel}
            preventLevelFocus={index > 0}
            preventFocus={preventFocus}
          />

          <Month
            monthDate={monthDate}
            daysRefs={daysRefs.current?.[index]}
            onDayKeyDown={(...args) => onDayKeyDown(index, ...args)}
            minDate={minDate}
            maxDate={maxDate}
            locale={locale}
            focusable={index === 0}
            preventFocus={preventFocus}
            renderDay={renderDay}
            weekdayLabelFormat={weekdayLabelFormat}
            {...rest}
          />
        </Box>
      )
    })

  return <>{months}</>
}
