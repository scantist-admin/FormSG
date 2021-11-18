import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { DndContextProps, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { pick } from 'lodash'

import { useAdminForm } from '~features/admin-form/common/queries'

import { useBuilderPage } from '../../BuilderPageContext'
import { useMutateAdminForm } from '../../mutations'
import { DragItem, FieldDropType, FormBuilderField } from '../../types'

import { generateDraggableFields } from './utils/generateDraggableFields'

type FormBuilderContextProps = {
  draggableBasicFieldItems: DragItem[]
  setDraggableBasicFieldItems: Dispatch<SetStateAction<DragItem[]>>

  handleDragStart: DndContextProps['onDragStart']
  handleDragOver: DndContextProps['onDragOver']
  handleDragCancel: DndContextProps['onDragCancel']
  handleDragEnd: DndContextProps['onDragEnd']

  handleCloseDrawer: () => void

  sortItems: FormBuilderField[]
  currentDragItem: DragItem | null

  currentSelectedField: FormBuilderField | null
  handleFieldClick: (field: FormBuilderField) => void
  setCurrentSelectedField: Dispatch<SetStateAction<FormBuilderField | null>>

  isLoading: boolean
}

const FormBuilderContext = createContext<FormBuilderContextProps | undefined>(
  undefined,
)

/**
 * Provider component that makes page context object available to any
 * child component that calls `useBuilderPage()`.
 */
export const FormBuilderProvider: FC = ({ children }) => {
  const context = useProvideFormBuilder()

  return (
    <FormBuilderContext.Provider value={context}>
      {children}
    </FormBuilderContext.Provider>
  )
}

export const useFormBuilder = (): FormBuilderContextProps => {
  const context = useContext(FormBuilderContext)
  if (!context) {
    throw new Error(
      `useFormBuilder must be used within a FormBuilderProvider component`,
    )
  }
  return context
}

// Provider hook that creates builder object and handles build state
const useProvideFormBuilder = (): FormBuilderContextProps => {
  const { data, isLoading } = useAdminForm()
  const { handleBuilderClick, handleClose } = useBuilderPage()

  const [draggableBasicFieldItems, setDraggableBasicFieldItems] = useState(
    generateDraggableFields,
  )
  const [currentDragItem, setCurrentDragItem] = useState<DragItem | null>(null)
  const [currentSelectedField, setCurrentSelectedField] =
    useState<FormBuilderField | null>(null)
  const [sortItems, setSortItems] = useState<FormBuilderField[]>([])

  const { mutateReorderField } = useMutateAdminForm()

  useEffect(() => {
    if (data) {
      setSortItems(
        data.form_fields.map((field) => ({ ...field, id: field._id })),
      )
    }
  }, [data])

  const handleCloseDrawer = useCallback(() => {
    setCurrentSelectedField(null)
    handleClose()
  }, [handleClose])

  const handleFieldClick = useCallback(
    (field: FormBuilderField) => {
      handleBuilderClick()
      setCurrentSelectedField(field)
    },
    [handleBuilderClick],
  )

  const handleDragStart: DndContextProps['onDragStart'] = useCallback(
    ({ active }: DragStartEvent) => {
      if (currentSelectedField) {
        setCurrentSelectedField(null)
      }
      setCurrentDragItem(
        pick(active.data.current, ['id', 'fieldType']) as DragItem,
      )
    },
    [currentSelectedField],
  )

  const handleDragOver: DndContextProps['onDragOver'] = useCallback(
    ({ active, over }: DragOverEvent) => {
      // Create type, check index to insert new field.
      if (
        currentDragItem &&
        active.data.current?.type === FieldDropType.Create
      ) {
        return
        // setSortItems((items) => {
        //   const overIndex = sortItems.findIndex((i) => i.id === over?.id)
        //   const newIndex = overIndex === -1 ? items.length : overIndex

        //   return [
        //     ...items.slice(0, newIndex),
        //     { ...currentDragItem, isCreate: true },
        //     ...items.slice(newIndex),
        //   ]
        // })
      }
    },
    [currentDragItem],
  )

  const handleDragCancel: DndContextProps['onDragCancel'] = useCallback(
    ({ active }) => {
      // const item = draggableBasicFieldItems.find((i) => i.id === active.id)
      // if (item) {
      //   const filteredSortItems = sortItems.filter((i) => i.id !== item.id)
      //   if (filteredSortItems.length < sortItems.length) {
      //     setSortItems(filteredSortItems)
      //     setDraggableBasicFieldItems(generateDraggableFields())
      //   }
      // }
      return
    },
    [],
  )

  const handleDragEnd: DndContextProps['onDragEnd'] = useCallback(
    ({ active, over }) => {
      // const item = draggableBasicFieldItems.find((i) => i.id === active.id)
      // if (item) return

      // Cancelled drag, but one of the basic field create items.
      // if (!over && item) {
      //   const filteredSortItems = sortItems.filter((i) => i.id !== item.id)
      //   if (filteredSortItems.length < sortItems.length) {
      //     setSortItems(filteredSortItems)
      //     setDraggableBasicFieldItems(generateDraggableFields())
      //   }
      // }

      if (over) {
        // if (item) {
        //   return
        // setDraggableBasicFieldItems(generateDraggableFields())
        // setCurrentSelectedField(item)
        // }
        const activeIndex = sortItems.findIndex((i) => i.id === active.id)
        const overIndex = sortItems.findIndex((i) => i.id === over.id)
        if (activeIndex !== overIndex) {
          setSortItems((items) => arrayMove(items, activeIndex, overIndex))

          mutateReorderField.mutate(
            {
              fieldId: active.id,
              newPosition: overIndex,
            },
            {
              onError: (_err, _vars, context) => {
                if (context?.previousFormState) {
                  setSortItems(
                    context.previousFormState.form_fields.map((field) => ({
                      ...field,
                      id: field._id,
                    })),
                  )
                }
              },
            },
          )
        }
      }

      setCurrentDragItem(null)
    },
    [mutateReorderField, sortItems],
  )

  return {
    draggableBasicFieldItems,
    setDraggableBasicFieldItems,
    handleDragStart,
    handleDragCancel,
    handleDragOver,
    handleDragEnd,
    handleCloseDrawer,
    sortItems,
    currentDragItem,
    currentSelectedField,
    setCurrentSelectedField,
    handleFieldClick,
    isLoading,
  }
}
