import { BiGridHorizontal } from 'react-icons/bi'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { DragItem, FieldDropType } from '../../types'
import { FieldOption } from '../BuilderDrawer/DraggableField'

import { useFormBuilder } from './FormBuilderContext'

interface SortableFieldRowProps {
  item: DragItem
}
export const SortableFieldRow = ({
  item,
}: SortableFieldRowProps): JSX.Element => {
  const { isLoading } = useFormBuilder()
  const {
    listeners,
    setNodeRef,
    transform,
    attributes,
    transition,
    isDragging,
  } = useSortable({
    disabled: isLoading,
    id: item.id,
    data: {
      ...item,
      type: FieldDropType.Reorder,
    },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  if (isDragging && item.isCreate) {
    return (
      <Box
        style={style}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        py="1.5rem"
        px="2.5rem"
        bg="primary.200"
        border="1px solid"
        borderColor="primary.500"
        textAlign="center"
      >
        <Text textStyle="subhead-2" color="primary.400">
          Drop your field here
        </Text>
      </Box>
    )
  }

  if (isDragging) {
    return (
      <Box
        style={style}
        px="2.5rem"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <FieldOption isDragging={isDragging} {...item} />
      </Box>
    )
  }

  return (
    <Flex
      bg="secondary.100"
      borderRadius="4px"
      _focusWithin={{
        boxShadow: '0 0 0 2px var(--chakra-colors-primary-500)',
      }}
      style={style}
      px="2.5rem"
      ref={setNodeRef}
      flexDir="column"
      align="center"
    >
      <Icon
        as={BiGridHorizontal}
        color="secondary.200"
        fontSize="1.5rem"
        {...listeners}
        {...attributes}
        cursor="grab"
        transition="color 0.2s ease"
        _hover={{
          color: 'secondary.300',
        }}
      />
      {item.fieldType}
    </Flex>
  )
}
