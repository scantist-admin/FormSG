import { Box, Flex, Wrap } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { CalendarHeader } from './CalendarHeader'
import { Month } from './Month'
import { TodayButton } from './TodayButton'
import { DayKeydownPayload, MonthSettings } from './types'
import { isMonthInRange } from './utils'

interface MonthViewProps extends MonthSettings {
  locale: string
  amountOfMonths: number
  monthDate: Date
  allowLevelChange: boolean
  daysRefs: React.RefObject<HTMLButtonElement[][][]>
  onMonthChange(month: Date): void
  onTodayClick(): void
  onMonthLevel(): void
  onYearLevel(): void
  onDayKeyDown(
    payload: DayKeydownPayload,
    event: React.KeyboardEvent<HTMLButtonElement>,
  ): void
  nextMonthLabel?: string
  previousMonthLabel?: string
  todayButtonLabel?: string
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
  onTodayClick,
  nextMonthLabel,
  previousMonthLabel,
  todayButtonLabel,
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
              index + 1 === amountOfMonths &&
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
            monthDate={calMonthDate}
            daysRefs={daysRefs.current?.[index]}
            onDayKeyDown={onDayKeyDown}
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

  return (
    <Flex flexDir="column">
      <Wrap justify="center" shouldWrapChildren spacingX={0}>
        {months}
      </Wrap>
      <TodayButton onClick={onTodayClick} todayButtonLabel={todayButtonLabel} />
    </Flex>
  )
}
