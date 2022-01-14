import { useMutation, useQueryClient } from 'react-query'

import {
  SendUserContactOtpDto,
  UserDto,
  VerifyUserContactOtpDto,
} from '~shared/types/user'

import { ApiError } from '~typings/core'

import { useToast } from '~hooks/useToast'
import {
  generateUserContactOtp,
  verifyUserContactOtp,
} from '~services/UserService'

import { userKeys } from './queries'

export const useUserMutations = () => {
  const queryClient = useQueryClient()
  const toast = useToast({ status: 'success', isClosable: true })

  const generateOtpMutation = useMutation<
    void,
    ApiError,
    SendUserContactOtpDto
  >((params) => generateUserContactOtp(params))

  const verifyOtpMutation = useMutation<
    UserDto,
    ApiError,
    VerifyUserContactOtpDto
  >((params) => verifyUserContactOtp(params), {
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.base, data)
      toast({
        description: 'Emergency contact added.',
      })
    },
  })

  return {
    generateOtpMutation,
    verifyOtpMutation,
  }
}