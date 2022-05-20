import { useRef, useState } from 'react'
import {
  Box,
  StylesProvider,
  useControllableState,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { DateView } from './DateView'
import { MonthPicker } from './MonthPicker'
import { DayKeydownPayload, MonthSettings } from './types'
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

  /** dayjs label format */
  labelFormat?: string

  /** dayjs label format for weekday heading */
  weekdayLabelFormat?: string
}

export const Calendar = ({
  amountOfMonths = 1,
  month,
  minDate,
  maxDate,
  initialMonth,
  onMonthChange,
  initialLevel = 'date',
  value,
  allowLevelChange = true,
  disableOutsideEvents,
  excludeDate,
  hideWeekdays,
  fullWidth,
  preventFocus,
  firstDayOfWeek,
  range,
  onChange,
  nextMonthLabel,
  previousMonthLabel,
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

  const [_month, setMonth] = useControllableState({
    value: month,
    defaultValue: initialMonth ?? new Date(),
    onChange: onMonthChange,
  })
  const [yearSelection, setYearSelection] = useState(_month.getFullYear())
  const minYear = minDate instanceof Date ? minDate.getFullYear() : 0
  const maxYear = maxDate instanceof Date ? maxDate.getFullYear() : 10000

  const handleDayKeyDown = (
    monthIndex: number,
    payload: DayKeydownPayload,
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    switch (event.code) {
      case 'ArrowDown': {
        event.preventDefault()

        if (payload.rowIndex + 1 < daysRefs.current[monthIndex].length) {
          daysRefs.current[monthIndex][payload.rowIndex + 1][
            payload.cellIndex
          ].focus()
        }
        break
      }

      case 'ArrowUp': {
        event.preventDefault()

        if (payload.rowIndex > 0) {
          daysRefs.current[monthIndex][payload.rowIndex - 1][
            payload.cellIndex
          ].focus()
        }
        break
      }

      case 'ArrowRight': {
        event.preventDefault()

        if (payload.cellIndex !== 6) {
          daysRefs.current[monthIndex][payload.rowIndex][
            payload.cellIndex + 1
          ].focus()
        } else if (monthIndex + 1 < amountOfMonths) {
          if (daysRefs.current[monthIndex + 1][payload.rowIndex]) {
            daysRefs.current[monthIndex + 1][payload.rowIndex][0]?.focus()
          }
        }

        break
      }

      case 'ArrowLeft': {
        event.preventDefault()

        if (payload.cellIndex !== 0) {
          daysRefs.current[monthIndex][payload.rowIndex][
            payload.cellIndex - 1
          ].focus()
        } else if (monthIndex > 0) {
          if (daysRefs.current[monthIndex - 1][payload.rowIndex]) {
            daysRefs.current[monthIndex - 1][payload.rowIndex][6].focus()
          }
        }
      }
    }
  }

  return (
    <StylesProvider value={styles}>
      <Box sx={styles.container}>
        {selectionState === 'year' && (
          <YearPicker
            amountOfMonths={amountOfMonths}
            month={_month}
            minDate={minDate}
            maxDate={maxDate}
            allowLevelChange={allowLevelChange}
            daysRefs={daysRefs}
            onMonthChange={setMonth}
            onMonthLevel={() => setSelectionState('month')}
            onYearLevel={() => setSelectionState('year')}
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
        {selectionState === 'month' && (
          <MonthPicker
            amountOfMonths={amountOfMonths}
            month={_month}
            minDate={minDate}
            maxDate={maxDate}
            allowLevelChange={allowLevelChange}
            daysRefs={daysRefs}
            onMonthChange={setMonth}
            onMonthLevel={() => setSelectionState('month')}
            onYearLevel={() => setSelectionState('year')}
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
        {selectionState === 'date' && (
          <DateView
            amountOfMonths={amountOfMonths}
            month={_month}
            minDate={minDate}
            maxDate={maxDate}
            allowLevelChange={allowLevelChange}
            daysRefs={daysRefs}
            onMonthChange={setMonth}
            onMonthLevel={() => setSelectionState('month')}
            onYearLevel={() => setSelectionState('year')}
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
      </Box>
    </StylesProvider>
  )
}
