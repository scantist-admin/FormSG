import { Box, forwardRef, Skeleton, Slide, Text } from '@chakra-ui/react'

import { FormHeaderProps } from '../FormHeader/FormHeader'
import { useFormHeader } from '../useFormHeader'

export interface MiniHeaderProps extends FormHeaderProps {
  isOpen: boolean
}

/**
 * MiniHeader that shows up when form is scrolled and the main start page is not
 * visible.
 */
export const MiniHeader = forwardRef<MiniHeaderProps, 'div'>(
  ({ isOpen, startPage, title }, ref) => {
    const { titleBg, titleColour } = useFormHeader({ startPage, title })

    return (
      <Slide
        // Screen readers do not need to know of the existence of this component.
        aria-hidden
        ref={ref}
        direction="top"
        in={isOpen}
        style={{ zIndex: 10 }}
      >
        <Box bg={titleBg} px="2rem" py="1rem">
          <Skeleton isLoaded={!!title}>
            <Text as="h2" textStyle="h2" textAlign="start" color={titleColour}>
              {title ?? 'Loading title'}
            </Text>
          </Skeleton>
        </Box>
      </Slide>
    )
  },
)
