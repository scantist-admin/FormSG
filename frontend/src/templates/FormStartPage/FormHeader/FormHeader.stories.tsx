import { Meta, Story } from '@storybook/react'

import { FormColorTheme } from '~shared/types/form/form'

import { FormHeader, FormHeaderProps } from './FormHeader'

export default {
  title: 'Templates/FormStartPage/FormHeader',
  component: FormHeader,
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
    title: title ?? `storybook test title ${colorTheme}`,
    startPage: {
      colorTheme,
      estTimeTaken,
    },
  }
}

const Template: Story<FormHeaderProps> = (args) => <FormHeader {...args} />
export const ColorThemeBlue = Template.bind({})
ColorThemeBlue.args = createStoryArgs()

export const WithEstimatedTime = Template.bind({})
WithEstimatedTime.args = createStoryArgs({ estTimeTaken: 200 })

export const ColorThemeBrown = Template.bind({})
ColorThemeBrown.args = createStoryArgs({
  estTimeTaken: 200,
  colorTheme: FormColorTheme.Brown,
})

export const ColorThemeGreen = Template.bind({})
ColorThemeGreen.args = createStoryArgs({
  estTimeTaken: 200,
  colorTheme: FormColorTheme.Green,
})

export const ColorThemeGrey = Template.bind({})
ColorThemeGrey.args = createStoryArgs({
  estTimeTaken: 200,
  colorTheme: FormColorTheme.Grey,
})

export const ColorThemeOrange = Template.bind({})
ColorThemeOrange.args = createStoryArgs({
  estTimeTaken: 200,
  colorTheme: FormColorTheme.Orange,
})

export const ColorThemeRed = Template.bind({})
ColorThemeRed.args = createStoryArgs({
  estTimeTaken: 200,
  colorTheme: FormColorTheme.Red,
})
