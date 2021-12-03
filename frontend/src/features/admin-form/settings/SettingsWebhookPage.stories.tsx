import { Meta, Story } from '@storybook/react'

import { SettingsWebhookPage } from './SettingsWebhookPage'

export default {
  title: 'Pages/AdminFormPage/Settings/SettingsTab',
  component: SettingsWebhookPage,
  decorators: [],
} as Meta

const Template: Story = (args) => <SettingsWebhookPage {...args} />
export const Default = Template.bind({})
Default.args = {}
