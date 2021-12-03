import { Box, HStack, Input, Text } from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SettingsWebhookPageProps {}

export const SettingsWebhookPage =
  ({}: SettingsWebhookPageProps): JSX.Element => {
    return (
      <Box>
        <Text mb="2.5rem" textStyle="h2" color="secondary.500">
          Webhooks
        </Text>
        <HStack spacing="0.5rem">
          <Text textStyle="subhead-1" color="secondary.700">
            Endpoint Url
          </Text>
          <Text textStyle="body-2" color="neutral.700">
            (optional)
          </Text>
        </HStack>
        <Box width="42.4375rem">
          <Text mb="0.75rem" textStyle="body-2" color="secondary.400">
            For developers and IT officers usage. We will POST encrypted form
            responses in real-time to the HTTPS endpoint specified here.
          </Text>
          <Input placeholder="https://your-webhook.com/url" />
        </Box>
      </Box>
    )
  }
