import { Meta, Story } from '@storybook/react'

import Dropdown from '.'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
} as unknown as Meta

type DropdownTemplateProps = {
  defaultText?: string
  options: string[]
}

const DropdownTemplate: Story<DropdownTemplateProps> = (props) => {
  return <Dropdown {...props} />
}

export const Default = DropdownTemplate.bind({})
Default.args = {
  defaultText: 'Select...',
  options: ['abc', 'ccb', 'bbf', 'def'],
}
