import { useMemo } from 'react'
import { Flex, Stack, useStyles } from '@chakra-ui/react'

import { BxChevronLeft, BxChevronRight } from '~assets/icons'
import { BxExpandVertical } from '~assets/icons/BxExpandVertical'
import { useIsMobile } from '~hooks/useIsMobile'
import Button from '~components/Button'
import IconButton from '~components/IconButton'

import { formatMonthLabel, formatYearLabel } from './utils'

export interface CalendarHeaderProps {
  hasPrevious: boolean
  hasNext: boolean
  onNext?(): void
  onPrevious?(): void
  onMonthLevel?(): void
  onYearLevel?(): void
  selectMonthLabel?: string
  selectYearLabel?: string
  nextLabel?: string
  previousLabel?: string
  preventLevelFocus?: boolean
  preventFocus?: boolean
  monthDate: Date
  locale: string
}

export const CalendarHeader = ({
  hasPrevious,
  hasNext,
  onNext,
  onPrevious,
  previousLabel = 'Back one month',
  nextLabel = 'Forward one month',
  monthDate,
  locale,
  onMonthLevel,
  onYearLevel,
  selectMonthLabel = 'Select a month',
  selectYearLabel = 'Select a year',
}: CalendarHeaderProps): JSX.Element => {
  const styles = useStyles()
  const isMobile = useIsMobile()
  const headerLabels = useMemo(
    () => ({
      month: formatMonthLabel({
        date: monthDate,
        locale,
        abbreviate: isMobile,
      }),
      year: formatYearLabel({ date: monthDate, locale }),
    }),
    [isMobile, locale, monthDate],
  )

  return (
    <Flex sx={styles.monthYearSelectorContainer}>
      <Stack direction="row">
        <Button
          isDisabled={!onMonthLevel}
          onClick={onMonthLevel}
          px="0.5rem"
          variant="clear"
          colorScheme="secondary"
          aria-label={selectMonthLabel}
          rightIcon={<BxExpandVertical />}
        >
          {headerLabels.month}
        </Button>
        <Button
          isDisabled={!onYearLevel}
          onClick={onYearLevel}
          px="0.5rem"
          variant="clear"
          colorScheme="secondary"
          aria-label={selectYearLabel}
          rightIcon={<BxExpandVertical />}
        >
          {headerLabels.year}
        </Button>
      </Stack>
      <Flex sx={styles.monthArrowContainer}>
        <IconButton
          isDisabled={!hasPrevious}
          onClick={onPrevious}
          variant="clear"
          colorScheme="secondary"
          icon={<BxChevronLeft />}
          aria-label={previousLabel}
          // minW={{ base: '1.75rem', xs: '2.75rem', sm: '2.75rem' }}
          // {...getBackProps({ calendars })}
        />
        <IconButton
          variant="clear"
          colorScheme="secondary"
          icon={<BxChevronRight />}
          isDisabled={!hasNext}
          onClick={onNext}
          aria-label={nextLabel}
          // minW={{ base: '1.75rem', xs: '2.75rem', sm: '2.75rem' }}
          // {...getForwardProps({ calendars })}
        />
      </Flex>
    </Flex>
  )
}
