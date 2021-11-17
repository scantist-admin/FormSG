import { Meta, Story } from '@storybook/react'

import { FormColorTheme } from '~shared/types/form/form'

import { MiniHeader, MiniHeaderProps } from './MiniHeader'

export default {
  title: 'Templates/FormStartPage/MiniHeader',
  component: MiniHeader,
  decorators: [],
} as Meta

const createStoryArgs = ({
  colorTheme = FormColorTheme.Blue,
  title,
  estTimeTaken,
}: {
  colorTheme?: FormColorTheme
  title?: string
  estTimeTaken?: number
} = {}) => {
  return {
    isOpen: true,
    title: title ?? `storybook test title ${colorTheme}`,
    startPage: {
      colorTheme,
      estTimeTaken,
    },
  }
}

const Template: Story<MiniHeaderProps> = (args) => <MiniHeader {...args} />
export const ColorThemeBlue = Template.bind({})
ColorThemeBlue.args = createStoryArgs({ colorTheme: FormColorTheme.Blue })

export const ColorThemeBrown = Template.bind({})
ColorThemeBrown.args = createStoryArgs({
  colorTheme: FormColorTheme.Brown,
})

export const ColorThemeGreen = Template.bind({})
ColorThemeGreen.args = createStoryArgs({
  colorTheme: FormColorTheme.Green,
})

export const ColorThemeGrey = Template.bind({})
ColorThemeGrey.args = createStoryArgs({
  colorTheme: FormColorTheme.Grey,
})

export const ColorThemeOrange = Template.bind({})
ColorThemeOrange.args = createStoryArgs({
  colorTheme: FormColorTheme.Orange,
})

export const ColorThemeRed = Template.bind({})
ColorThemeRed.args = createStoryArgs({
  colorTheme: FormColorTheme.Red,
})
