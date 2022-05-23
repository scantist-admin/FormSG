import { Meta, Story } from '@storybook/react'

import { Calendar, CalendarProps } from './Calendar'

export default {
  title: 'Components/Calendar',
  component: Calendar,
  decorators: [],
} as Meta

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />
export const Default = Template.bind({})
Default.args = {}

export const MultiCalendar = Template.bind({})
MultiCalendar.args = {
  amountOfMonths: 2,
}
