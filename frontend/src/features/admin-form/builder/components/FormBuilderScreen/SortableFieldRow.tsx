import { useMemo } from 'react'
import { BiDuplicate, BiGridHorizontal, BiTrash } from 'react-icons/bi'
import { Box, ButtonGroup, Collapse, Flex, Icon } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import IconButton from '~components/IconButton'

import { FieldDropType, FormBuilderField } from '../../types'
import { FieldOption } from '../BuilderDrawer/DraggableField'

import { useFormBuilder } from './FormBuilderContext'

interface SortableFieldRowProps {
  item: FormBuilderField
}
export const SortableFieldRow = ({
  item,
}: SortableFieldRowProps): JSX.Element => {
  const { isLoading, currentSelectedField, handleFieldClick } = useFormBuilder()
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

  const isActive = useMemo(
    () => currentSelectedField?.id === item.id,
    [currentSelectedField?.id, item.id],
  )

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  // if (isDragging && item.isCreate) {
  //   return (
  //     <Box
  //       style={style}
  //       ref={setNodeRef}
  //       {...listeners}
  //       {...attributes}
  //       py="1.5rem"
  //       px="2.5rem"
  //       bg="primary.200"
  //       border="1px solid"
  //       borderColor="primary.500"
  //       textAlign="center"
  //     >
  //       <Text textStyle="subhead-2" color="primary.400">
  //         Drop your field here
  //       </Text>
  //     </Box>
  //   )
  // }

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
      bg={isActive ? 'secondary.100' : 'white'}
      borderRadius="4px"
      {...(isActive ? { 'data-active': true } : {})}
      _focusWithin={{
        boxShadow: '0 0 0 2px var(--chakra-colors-primary-500)',
      }}
      _active={{
        boxShadow: '0 0 0 2px var(--chakra-colors-primary-500)',
      }}
      onClick={() => handleFieldClick(item)}
      style={style}
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
      {/* TODO: Render the field */}
      <Box>{item.fieldType}</Box>
      <Collapse in={isActive} style={{ width: '100%' }}>
        <Flex
          px="1.5rem"
          flex={1}
          borderTop="1px solid var(--chakra-colors-neutral-300)"
          justify="end"
        >
          <ButtonGroup variant="clear" colorScheme="secondary" spacing={0}>
            <IconButton
              aria-label="Duplicate field"
              icon={<BiDuplicate fontSize="1.25rem" />}
            />
            <IconButton
              colorScheme="danger"
              aria-label="Delete field"
              icon={<BiTrash fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Flex>
      </Collapse>
    </Flex>
  )
}
