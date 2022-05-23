import { useMemo } from 'react'
import { chakra, useStyles } from '@chakra-ui/react'
import { isSameDay } from 'date-fns'
import dayjs from 'dayjs'

import { DayKeydownPayload, MonthSettings } from '../types'
import { getMonthDays, getWeekdaysNames } from '../utils'

import { getDayProps } from './Day/utils'
import { Day } from './Day'

export interface MonthProps extends MonthSettings {
  /** Date at which month should be shown */
  monthDate: Date

  /** Locale is used to get weekdays names with dayjs format */
  locale?: string

  /** Selected date or an array of selected dates */
  value?: Date | Date[]

  /** Selected range */
  range?: [Date, Date]

  /** Called when day is selected */
  onChange?(value: Date): void

  /** Called when onMouseEnter event fired on day button */
  onDayMouseEnter?(date: Date, event: React.MouseEvent): void

  /** Get days buttons refs */
  daysRefs?: HTMLButtonElement[][]

  /** Called when keydown event is registered on day */
  onDayKeyDown?(
    payload: DayKeydownPayload,
    event: React.KeyboardEvent<HTMLButtonElement>,
  ): void

  /** Render day based on the date */
  renderDay?(date: Date): React.ReactNode

  /** dayjs label format for weekday heading */
  weekdayLabelFormat?: string
}

export const Month = ({
  locale = 'en',
  firstDayOfWeek,
  weekdayLabelFormat,
  monthDate,
  daysRefs,
  onChange,
  value,
  minDate,
  maxDate,
  excludeDate,
  disableOutsideEvents,
  hideOutsideDates,
  range,
  isDateInRange,
  isDateFirstInRange,
  isDateLastInRange,
  onDayKeyDown,
  onDayMouseEnter,
  fullWidth,
  focusable,
  renderDay,
}: MonthProps): JSX.Element => {
  const styles = useStyles()

  const monthDays = useMemo(
    () => getMonthDays(monthDate, firstDayOfWeek),
    [firstDayOfWeek, monthDate],
  )
  const dayLabels = useMemo(
    () => getWeekdaysNames(locale, firstDayOfWeek, weekdayLabelFormat),
    [firstDayOfWeek, locale, weekdayLabelFormat],
  )

  const hasValueInMonthRange = useMemo(
    () =>
      value instanceof Date &&
      dayjs(value).isAfter(dayjs(monthDate).startOf('month')) &&
      dayjs(value).isBefore(dayjs(monthDate).endOf('month')),
    [monthDate, value],
  )

  return (
    <chakra.table sx={styles.grid}>
      <chakra.thead>
        <chakra.tr>
          {dayLabels.map((weekday, index) => (
            <chakra.th key={index} sx={styles.dayNamesContainer}>
              {weekday}
            </chakra.th>
          ))}
        </chakra.tr>
      </chakra.thead>
      <chakra.tbody>
        {monthDays.map((week, weekIndex) => {
          return (
            <chakra.tr key={weekIndex}>
              {week.map((date, dayIndex) => {
                const dayProps = getDayProps({
                  date,
                  month: monthDate,
                  minDate,
                  maxDate,
                  value,
                  excludeDate,
                  disableOutsideEvents,
                  range,
                })

                return (
                  <chakra.td key={dayIndex}>
                    <Day
                      ref={(button) => {
                        if (daysRefs && button) {
                          if (!Array.isArray(daysRefs[weekIndex])) {
                            daysRefs[weekIndex] = []
                          }
                          daysRefs[weekIndex][dayIndex] = button
                        }
                      }}
                      onClick={() => onChange?.(date)}
                      value={date}
                      outside={dayProps.outside}
                      weekend={dayProps.weekend}
                      inRange={
                        dayProps.inRange ||
                        isDateInRange?.(date, dayProps) ||
                        hasValueInMonthRange
                      }
                      firstInRange={
                        dayProps.firstInRange ||
                        isDateFirstInRange?.(date, dayProps) ||
                        false
                      }
                      lastInRange={
                        dayProps.lastInRange ||
                        isDateLastInRange?.(date, dayProps) ||
                        false
                      }
                      firstInMonth={
                        hideOutsideDates
                          ? isSameDay(
                              date,
                              dayjs(monthDate).startOf('month').toDate(),
                            )
                          : dayIndex === 0 && weekIndex === 0
                      }
                      selected={dayProps.selected || dayProps.selectedInRange}
                      hasValue={hasValueInMonthRange}
                      onKeyDown={(event) => onDayKeyDown?.({ date }, event)}
                      isDisabled={dayProps.disabled}
                      onMouseEnter={onDayMouseEnter}
                      fullWidth={fullWidth}
                      focusable={focusable}
                      hideOutsideDates={hideOutsideDates}
                      renderDay={renderDay}
                    />
                  </chakra.td>
                )
              })}
            </chakra.tr>
          )
        })}
      </chakra.tbody>
    </chakra.table>
  )
}
