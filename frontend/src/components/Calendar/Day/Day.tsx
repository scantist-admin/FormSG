import { useMemo } from 'react'
import { Box, chakra, forwardRef, useMultiStyleConfig } from '@chakra-ui/react'
import { format, isSameDay } from 'date-fns'

import { getDayTabIndex } from './utils'

export interface DayProps {
  value: Date
  selected: boolean
  weekend: boolean
  outside: boolean
  onMouseEnter?(date: Date, event: React.MouseEvent): void
  isDisabled: boolean
  hasValue: boolean
  inRange: boolean
  firstInRange: boolean
  lastInRange: boolean
  fullWidth?: boolean
  firstInMonth: boolean
  focusable?: boolean
  hideOutsideDates?: boolean
  renderDay?(date: Date): React.ReactNode
}

export const Day = forwardRef<DayProps, 'button'>(
  (
    {
      onMouseEnter,
      renderDay,
      value,
      focusable,
      hasValue,
      selected,
      firstInMonth,
      outside,
      weekend,
      inRange,
      firstInRange,
      lastInRange,
      isDisabled,
      fullWidth,
      hideOutsideDates,
      ...rest
    },
    ref,
  ) => {
    const isToday = useMemo(() => isSameDay(value, new Date()), [value])
    const styles = useMultiStyleConfig('Calendar', {
      outside,
      isToday,
    })

    const hideDay = useMemo(
      () => !!hideOutsideDates && outside,
      [hideOutsideDates, outside],
    )

    if (hideDay) {
      return null
    }

    return (
      <Box px="2px" _focusWithin={{ zIndex: 1 }}>
        <chakra.button
          // Prevent form submission if this component is nested in a form.
          type="button"
          disabled={isDisabled}
          __css={styles.dayOfMonth}
          aria-selected={selected}
          onMouseEnter={(event) => onMouseEnter?.(value, event)}
          aria-label={format(value, "do 'of' MMMM',' EEEE")}
          tabIndex={getDayTabIndex({
            focusable,
            hasValue,
            selected,
            firstInMonth,
          })}
          ref={ref}
          {...rest}
        >
          {renderDay?.(value) ?? value.getDate()}
        </chakra.button>
      </Box>
    )
  },
)
