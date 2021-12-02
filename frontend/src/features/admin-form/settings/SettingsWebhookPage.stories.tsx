import { Meta, Story } from '@storybook/react'

import { SettingsWebhookPage } from './SettingsWebhookPage'

export default {
  title: 'Components/SettingsWebhookPage',
  component: SettingsWebhookPage,
  decorators: [],
} as Meta

const Template: Story = (args) => <SettingsWebhookPage {...args} />
export const Default = Template.bind({})
Default.args = {}
