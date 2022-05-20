export type FirstDayOfWeek = 'sunday' | 'monday'

export interface DayKeydownPayload {
  rowIndex: number
  cellIndex: number
  date: Date
}

export interface DayModifiers {
  /** Is date selected and is first or last in range? */
  selectedInRange: boolean

  /** Is date equal to value? */
  selected: boolean

  /** Based on minDate, maxDate, excludeDate and disableOutsideEvents props */
  disabled: boolean

  /** Is date is range? */
  inRange: boolean

  /** Is date first or last in given range? */
  firstInRange: boolean
  lastInRange: boolean

  /** Is date Saturday or Sunday? */
  weekend: boolean

  /** Is date outside of given month? */
  outside: boolean
}

export interface MonthSettings {
  /** When true dates that are outside of given month cannot be clicked or focused */
  disableOutsideEvents?: boolean

  /** Minimum possible date */
  minDate?: Date

  /** Maximum possible date */
  maxDate?: Date

  /** Callback function to determine if day should be disabled */
  excludeDate?(date: Date): boolean

  /** Set to false to remove weekdays row */
  hideWeekdays?: boolean

  /** Set to true to make calendar take 100% of container width */
  fullWidth?: boolean

  /** Prevent focusing upon clicking */
  preventFocus?: boolean

  /** Should focusable days have tabIndex={0}? */
  focusable?: boolean

  /** Set first day of the week */
  firstDayOfWeek?: FirstDayOfWeek

  /** Remove outside dates */
  hideOutsideDates?: boolean

  /** Should date be displayed as in range */
  isDateInRange?(date: Date, modifiers: DayModifiers): boolean

  /** Should date be displayed as first in range */
  isDateFirstInRange?(date: Date, modifiers: DayModifiers): boolean

  /** Should date be displayed as last in range */
  isDateLastInRange?(date: Date, modifiers: DayModifiers): boolean
}
