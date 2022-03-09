import { memo, useCallback, useEffect } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Box, Flex } from '@chakra-ui/react'

import { AdminFormDto } from '~shared/types/form'

import BuilderAndDesignPlaceholder from './components/BuilderAndDesignPlaceholder'
import { EmptyFormPlaceholder } from './components/BuilderAndDesignPlaceholder/EmptyFormPlaceholder'
import FieldRow from './components/FieldRow'
import { FIELD_LIST_DROP_ID } from './constants'
import { useEditFieldStore } from './editFieldStore'
import { DndPlaceholderProps } from './types'
import { useBuilderFormFields } from './useBuilderFormFields'

interface BuilderAndDesignContentProps {
  placeholderProps: DndPlaceholderProps
}

export const BuilderAndDesignContent = ({
  placeholderProps,
}: BuilderAndDesignContentProps): JSX.Element => {
  const { clearActiveField, clearFieldToCreate } = useEditFieldStore(
    useCallback((state) => {
      return {
        clearActiveField: state.clearActiveField,
        clearFieldToCreate: state.clearFieldToCreate,
      }
    }, []),
  )
  const { builderFields } = useBuilderFormFields()

  useEffect(() => {
    // Clear field on component unmount.
    return () => {
      clearActiveField()
      clearFieldToCreate()
    }
  }, [clearActiveField, clearFieldToCreate])

  return (
    <Flex flex={1} bg="neutral.200" overflow="auto">
      <Flex
        m={{ base: 0, md: '2rem' }}
        mb={0}
        flex={1}
        bg={{ base: 'secondary.100', md: 'primary.100' }}
        p={{ base: '1.5rem', md: '2.5rem' }}
        justify="center"
        overflow="auto"
      >
        <Flex
          h="fit-content"
          bg="white"
          p={{ base: 0, md: '2.5rem' }}
          maxW="57rem"
          w="100%"
          flexDir="column"
        >
          <Droppable droppableId={FIELD_LIST_DROP_ID}>
            {(provided, snapshot) =>
              builderFields?.length ? (
                <Box
                  pos="relative"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <BuilderFields
                    fields={builderFields}
                    isDraggingOver={snapshot.isDraggingOver}
                  />
                  {provided.placeholder}
                  <BuilderAndDesignPlaceholder
                    placeholderProps={placeholderProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  />
                </Box>
              ) : (
                <EmptyFormPlaceholder
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                />
              )
            }
          </Droppable>
        </Flex>
      </Flex>
    </Flex>
  )
}

interface BuilderFieldsProps {
  fields: AdminFormDto['form_fields']
  isDraggingOver: boolean
}

const BuilderFields = memo(
  ({ fields, isDraggingOver }: BuilderFieldsProps) => {
    if (!fields) {
      return <div>Loading...</div>
    }

    return (
      <>
        {fields.map((f, i) => (
          <FieldRow
            index={i}
            key={f._id}
            field={f}
            isDraggingOver={isDraggingOver}
          />
        ))}
      </>
    )
  },
  (prev, next) =>
    prev.fields === next.fields && prev.isDraggingOver === next.isDraggingOver,
)
