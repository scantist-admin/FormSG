import { useMemo } from 'react'
import { ColorProps } from '@chakra-ui/react'
import simplur from 'simplur'

import { FormColorTheme } from '~shared/types/form/form'

import { FormHeaderProps } from './FormHeader/FormHeader'

type UseFormHeaderReturn = {
  estTimeString: string
  titleBg: ColorProps['color']
  titleColour: ColorProps['color']
}

export const useFormHeader = ({
  startPage,
}: FormHeaderProps): UseFormHeaderReturn => {
  const titleColour = useMemo(() => {
    if (startPage?.colorTheme === FormColorTheme.Orange) {
      return 'secondary.700'
    }
    return 'white'
  }, [startPage?.colorTheme])

  const titleBg = useMemo(
    () =>
      startPage?.colorTheme
        ? `theme-${startPage.colorTheme}.500`
        : `neutral.200`,
    [startPage?.colorTheme],
  )

  const estTimeString = useMemo(() => {
    return startPage?.estTimeTaken
      ? simplur`${startPage.estTimeTaken} min[|s] estimated time to complete`
      : ''
  }, [startPage])

  return {
    estTimeString,
    titleBg,
    titleColour,
  }
}
