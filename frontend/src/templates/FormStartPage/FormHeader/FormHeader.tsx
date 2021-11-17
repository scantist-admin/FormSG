import { Flex, Icon, Skeleton, Text } from '@chakra-ui/react'

import { FormDto } from '~shared/types/form/form'

import { BxsTimeFive } from '~assets/icons/BxsTimeFive'

import { useFormHeader } from '../useFormHeader'

export type FormHeaderProps = Partial<
  Pick<FormDto, 'title'> & {
    startPage: Pick<FormDto['startPage'], 'colorTheme' | 'estTimeTaken'>
  }
>

export const FormHeader = (props: FormHeaderProps): JSX.Element => {
  const { estTimeString, titleBg, titleColour } = useFormHeader(props)

  return (
    <Flex p="3rem" justify="center" bg={titleBg} color="white">
      <Flex maxW="32.5rem" flexDir="column" align="center" color={titleColour}>
        <Skeleton isLoaded={!!props?.title}>
          <Text as="h1" textStyle="h1" textAlign="center">
            {props?.title ?? 'Loading title'}
          </Text>
        </Skeleton>
        {estTimeString && (
          <Flex align="center" justify="center" mt="1rem">
            <Icon as={BxsTimeFive} fontSize="1.5rem" mr="0.5rem" />
            <Text textStyle="body-2">{estTimeString}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
