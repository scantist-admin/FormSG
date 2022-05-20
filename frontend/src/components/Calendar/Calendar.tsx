import { useRef, useState } from 'react'
import {
  Flex,
  StylesProvider,
  useControllableState,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { MonthPicker } from './MonthPicker'
import { MonthView } from './MonthView'
import { DayKeydownPayload, MonthSettings } from './types'
import { getTodayOffset } from './utils'
import { YearPicker } from './YearPicker'

export interface CalendarProps extends MonthSettings {
  /** Month for controlled calendar */
  month?: Date

  /** Initial month for uncontrolled calendar */
  initialMonth?: Date

  /** Called when month changes */
  onMonthChange?(month: Date): void

  /** Locale used for labels formatting, defaults to theme.datesLocale */
  locale?: string

  /** Amount of months */
  amountOfMonths?: number

  /** Selected value */
  value?: Date | Date[]

  /** Initial value for uncontrolled calendar */
  defaultValue?: Date | Date[]

  /** Allow to change level (date – month – year) */
  allowLevelChange?: boolean

  /** Initial date selection level */
  initialLevel?: 'date' | 'month' | 'year'

  /** Selected range */
  range?: [Date, Date]

  /** Render day based on the date */
  renderDay?(date: Date): React.ReactNode

  /** Called when day is selected */
  onChange?(value: Date | Date[]): void

  /** Called when onMouseEnter event fired on day button */
  onDayMouseEnter?(date: Date, event: React.MouseEvent): void

  /** Next month control aria-label */
  nextMonthLabel?: string

  /** Previous month control aria-label */
  previousMonthLabel?: string

  /** Next year control aria-label */
  nextYearLabel?: string

  /** Previous year control aria-label */
  previousYearLabel?: string

  /** Next decade control aria-label */
  nextDecadeLabel?: string

  /** Previous decade control aria-label */
  previousDecadeLabel?: string

  /** Today button aria-label */
  todayButtonLabel?: string

  /** dayjs label format */
  labelFormat?: string

  /** dayjs label format for weekday heading */
  weekdayLabelFormat?: string
}

export const Calendar = ({
  amountOfMonths = 1,
  locale = 'en',
  month,
  minDate,
  maxDate,
  initialMonth,
  onMonthChange,
  initialLevel = 'date',
  defaultValue,
  value: valueProp,
  onChange: onChangeProp,
  allowLevelChange = true,
  disableOutsideEvents,
  excludeDate,
  hideWeekdays,
  fullWidth,
  preventFocus,
  firstDayOfWeek = 0,
  range,
  nextMonthLabel,
  previousMonthLabel,
  nextYearLabel,
  previousYearLabel,
  nextDecadeLabel,
  previousDecadeLabel,
  todayButtonLabel,
  labelFormat,
  weekdayLabelFormat,
  renderDay,
  onDayMouseEnter,
  hideOutsideDates,
  isDateInRange,
  isDateFirstInRange,
  isDateLastInRange,
}: CalendarProps): JSX.Element => {
  const styles = useMultiStyleConfig('Calendar', {})
  const [selectionState, setSelectionState] = useState(initialLevel)
  const daysRefs = useRef<HTMLButtonElement[][][]>(
    Array(amountOfMonths)
      .fill(0)
      .map(() => []),
  )

  const [value, onChange] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  })

  const [_month, setMonth] = useControllableState({
    value: month,
    defaultValue: initialMonth ?? new Date(),
    onChange: onMonthChange,
  })
  const minYear = minDate instanceof Date ? minDate.getFullYear() : 0
  const maxYear = maxDate instanceof Date ? maxDate.getFullYear() : 10000

  const handleTodayButtonClick = () => {
    const { startOfMonth, weekOffset, dayOffset } =
      getTodayOffset(firstDayOfWeek)
    setMonth(startOfMonth)

    const todayRef = daysRefs.current[0][weekOffset][dayOffset]
    if (todayRef) {
      // Adding focus-visible attributes to show focus ring regardless.
      todayRef.classList.add('focus-visible')
      todayRef.setAttribute('data-focus-visible-added', 'true')
      todayRef.focus()
    }
  }

  const handleDayKeyDown = (
    monthIndex: number,
    payload: DayKeydownPayload,
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    switch (event.code) {
      case 'ArrowDown': {
        event.preventDefault()

        if (payload.weekIndex + 1 < daysRefs.current[monthIndex].length) {
          daysRefs.current[monthIndex][payload.weekIndex + 1][
            payload.dayIndex
          ].focus()
        }
        break
      }

      case 'ArrowUp': {
        event.preventDefault()

        if (payload.weekIndex > 0) {
          daysRefs.current[monthIndex][payload.weekIndex - 1][
            payload.dayIndex
          ].focus()
        }
        break
      }

      case 'ArrowRight': {
        event.preventDefault()

        if (payload.dayIndex !== 6) {
          daysRefs.current[monthIndex][payload.weekIndex][
            payload.dayIndex + 1
          ].focus()
        } else if (monthIndex + 1 < amountOfMonths) {
          if (daysRefs.current[monthIndex + 1][payload.weekIndex]) {
            daysRefs.current[monthIndex + 1][payload.weekIndex][0]?.focus()
          }
        }

        break
      }

      case 'ArrowLeft': {
        event.preventDefault()

        if (payload.dayIndex !== 0) {
          daysRefs.current[monthIndex][payload.weekIndex][
            payload.dayIndex - 1
          ].focus()
        } else if (monthIndex > 0) {
          if (daysRefs.current[monthIndex - 1][payload.weekIndex]) {
            daysRefs.current[monthIndex - 1][payload.weekIndex][6].focus()
          }
        }
      }
    }
  }

  return (
    <StylesProvider value={styles}>
      <Flex sx={styles.container}>
        {selectionState === 'year' && (
          <YearPicker
            locale={locale}
            monthDate={_month}
            minYear={minYear}
            maxYear={maxYear}
            onMonthLevel={() => setSelectionState('month')}
            onYearLevel={() => setSelectionState('date')}
            onChange={(year) => {
              setMonth(new Date(year, _month.getMonth(), 1))
              setSelectionState('month')
            }}
            nextDecadeLabel={nextDecadeLabel}
            previousDecadeLabel={previousDecadeLabel}
            preventFocus={preventFocus}
          />
        )}
        {selectionState === 'month' && (
          <MonthPicker
            monthDate={_month}
            onYearChange={(year) => {
              setMonth(new Date(year, _month.getMonth(), 1))
            }}
            onMonthLevel={() => setSelectionState('date')}
            onYearLevel={() => setSelectionState('year')}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(monthValue) => {
              setMonth(new Date(_month.getFullYear(), monthValue, 1))
              setSelectionState('date')
            }}
            nextYearLabel={nextYearLabel}
            previousYearLabel={previousYearLabel}
            preventFocus={preventFocus}
          />
        )}
        {selectionState === 'date' && (
          <MonthView
            amountOfMonths={amountOfMonths}
            monthDate={_month}
            minDate={minDate}
            maxDate={maxDate}
            locale={locale}
            allowLevelChange={allowLevelChange}
            daysRefs={daysRefs}
            onMonthChange={setMonth}
            onMonthLevel={() => setSelectionState('month')}
            onYearLevel={() => setSelectionState('year')}
            onTodayClick={handleTodayButtonClick}
            onDayKeyDown={handleDayKeyDown}
            disableOutsideEvents={disableOutsideEvents}
            excludeDate={excludeDate}
            hideWeekdays={hideWeekdays}
            fullWidth={fullWidth}
            preventFocus={preventFocus}
            firstDayOfWeek={firstDayOfWeek}
            value={value}
            range={range}
            onChange={onChange}
            nextMonthLabel={nextMonthLabel}
            previousMonthLabel={previousMonthLabel}
            todayButtonLabel={todayButtonLabel}
            labelFormat={labelFormat}
            weekdayLabelFormat={weekdayLabelFormat}
            onDayMouseEnter={onDayMouseEnter}
            renderDay={renderDay}
            hideOutsideDates={hideOutsideDates}
            isDateInRange={isDateInRange}
            isDateFirstInRange={isDateFirstInRange}
            isDateLastInRange={isDateLastInRange}
          />
        )}
      </Flex>
    </StylesProvider>
  )
}
