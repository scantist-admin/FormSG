import { useState } from 'react'
import {
  Box,
  forwardRef,
  InputGroup,
  InputRightElement,
  MenuButton,
} from '@chakra-ui/react'

import { BxsChevronDown } from '../../assets/icons/BxsChevronDown'
import { BxsChevronUp } from '../../assets/icons/BxsChevronUp'
import { Input, InputProps } from '../Input/Input'
import Menu from '../Menu'

export interface DropdownProps {
  defaultText?: string
  options: string[]
}

export const Dropdown = (props: DropdownProps): JSX.Element => {
  const { defaultText = 'Select an option...' } = props
  const [selection, setSelection] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Create menu items from options
  const menuItems = props.options
    .filter((option) => option.match(new RegExp(selection, 'i')))
    .map((option) => {
      return (
        <Menu.Item
          onClick={() => {
            setSelection(option)
            setIsOpen(false)
          }}
        >
          {option}
        </Menu.Item>
      )
    })

  const boxInput = forwardRef<InputProps, 'input'>((_props, ref) => (
    <InputGroup ref={ref}>
      <Input
        onChange={(event) => {
          setSelection(event.target.value)
        }}
        onClick={() => {
          setIsOpen(true)
        }}
        value={selection}
        placeHolder={defaultText}
      />
      <InputRightElement
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        {isOpen ? <BxsChevronUp /> : <BxsChevronDown />}
      </InputRightElement>
    </InputGroup>
  ))

  return (
    <Box>
      <Menu isOpen={isOpen}>
        {({ isOpen }) => (
          <>
            <MenuButton as={boxInput} maxWidth="28rem" />
            <Menu.List>{menuItems}</Menu.List>
          </>
        )}
      </Menu>
    </Box>
  )
}
