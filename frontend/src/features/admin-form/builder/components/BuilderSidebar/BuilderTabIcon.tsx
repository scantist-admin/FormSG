import IconButton from '~components/IconButton'
import Tooltip from '~components/Tooltip'

interface BuilderTabIconProps {
  icon: React.ReactElement
  onClick: () => void
  label: string
  isActive: boolean
}
export const BuilderTabIcon = ({
  icon,
  onClick,
  label,
  isActive,
}: BuilderTabIconProps): JSX.Element => {
  return (
    <Tooltip label={label} placement="right">
      <IconButton
        aria-label={label}
        variant="reverse"
        isActive={isActive}
        icon={icon}
        onClick={onClick}
      />
    </Tooltip>
  )
}
