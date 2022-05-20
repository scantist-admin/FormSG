import { Box, useStyles } from '@chakra-ui/react'

import Button from '~components/Button'

interface TodayButtonProps {
  todayButtonLabel?: string
  onClick: () => void
}

export const TodayButton = ({
  onClick,
  todayButtonLabel,
}: TodayButtonProps): JSX.Element => {
  const styles = useStyles()
  return (
    <Box sx={styles.todayButtonContainer}>
      <Button
        sx={styles.todayButton}
        aria-label={todayButtonLabel}
        variant="clear"
        type="button"
        onClick={onClick}
      >
        Today
      </Button>
    </Box>
  )
}
