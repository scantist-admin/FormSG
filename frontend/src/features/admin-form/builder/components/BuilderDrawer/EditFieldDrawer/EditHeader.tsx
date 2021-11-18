import { Box } from '@chakra-ui/react'

import { SectionFieldSchema } from '~templates/Field/Section/SectionFieldContainer'

export interface EditHeaderProps {
  field: SectionFieldSchema
}

export const EditHeader = ({ field }: EditHeaderProps): JSX.Element => {
  return (
    <Box>
      {field.title}
      {field.description}
    </Box>
  )
}
