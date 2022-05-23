import { Meta, Story } from '@storybook/react'
import { isWeekend } from 'date-fns'

import { mockDateDecorator } from '~utils/storybook'

import { Calendar, CalendarProps } from './Calendar'

export default {
  title: 'Components/Calendar',
  component: Calendar,
  decorators: [mockDateDecorator],
  parameters: {
    mockdate: new Date('2021-12-25T06:22:27.219Z'),
  },
} as Meta

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />
export const Default = Template.bind({})
Default.args = {}

export const MultiCalendar = Template.bind({})
MultiCalendar.args = {
  amountOfMonths: 2,
  hideOutsideDates: true,
}

export const DisableWeekends = Template.bind({})
DisableWeekends.args = {
  hideWeekdays: true,
  excludeDate: (date) => isWeekend(date),
}
