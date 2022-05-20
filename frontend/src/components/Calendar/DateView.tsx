import { Box } from '@chakra-ui/react'

import { CalendarHeader } from './CalendarHeader'
import { DayKeydownPayload, MonthSettings } from './types'

interface DateViewProps extends MonthSettings {
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

export const DateView = ({
  monthDate,
  onMonthLevel,
  onYearLevel,
}: DateViewProps): JSX.Element => {
  return (
    <>
      <CalendarHeader
        onMonthLevel={onMonthLevel}
        onYearLevel={onYearLevel}
        monthDate={monthDate}
        locale="en"
        hasNext
        hasPrevious
      />
      <Box>Date view</Box>
    </>
  )
}
