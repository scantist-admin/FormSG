import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { uniqueId } from 'lodash'

import { BasicField } from '~shared/types/field'

import { BuilderTabs } from './types'

type BuilderPageContextProps = {
  activeTab: BuilderTabs | null
  draggableBasicFieldItems: {
    id: string
    fieldType: BasicField
  }[]
  setDraggableBasicFieldItems: Dispatch<
    SetStateAction<
      {
        id: string
        fieldType: BasicField
      }[]
    >
  >
  isShowDrawer: boolean
  handleClose: () => void
  handleBuilderClick: () => void
  handleDesignClick: () => void
  handleLogicClick: () => void
}

const BuilderPageContext = createContext<BuilderPageContextProps | undefined>(
  undefined,
)

/**
 * Provider component that makes page context object available to any
 * child component that calls `useBuilderPage()`.
 */
export const BuilderPageProvider: FC = ({ children }) => {
  const context = useProvidePageContext()

  return (
    <BuilderPageContext.Provider value={context}>
      {children}
    </BuilderPageContext.Provider>
  )
}

/**
 * Hook for components nested in ProvideAuth component to get the current auth object.
 */
export const useBuilderPage = (): BuilderPageContextProps => {
  const context = useContext(BuilderPageContext)
  if (!context) {
    throw new Error(
      `useBuilderPage must be used within a BuilderPageProvider component`,
    )
  }
  return context
}

const ALL_FIELDS_ORDERED = [
  // Page section
  BasicField.Section,
  BasicField.Statement,
  BasicField.Image,
  // Fields section
  BasicField.ShortText,
  BasicField.LongText,
  BasicField.Radio,
  BasicField.Checkbox,
  BasicField.Mobile,
  BasicField.Email,
  BasicField.HomeNo,
  BasicField.Dropdown,
  BasicField.YesNo,
  BasicField.Rating,
  BasicField.Number,
  BasicField.Decimal,
  BasicField.Attachment,
  BasicField.Date,
  BasicField.Table,
  BasicField.Nric,
  BasicField.Uen,
]

const generateBasicFieldItems = () => {
  return ALL_FIELDS_ORDERED.map((fieldType) => ({
    id: uniqueId(),
    fieldType,
  }))
}

// Provider hook that creates auth object and handles state
const useProvidePageContext = (): BuilderPageContextProps => {
  const [activeTab, setActiveTab] = useState<BuilderTabs | null>(null)
  const [draggableBasicFieldItems, setDraggableBasicFieldItems] = useState(
    generateBasicFieldItems,
  )

  const isShowDrawer = useMemo(
    () => activeTab !== null && activeTab !== BuilderTabs.Logic,
    [activeTab],
  )

  const handleClose = useCallback(() => setActiveTab(null), [])

  const handleBuilderClick = () => setActiveTab(BuilderTabs.Builder)
  const handleDesignClick = () => setActiveTab(BuilderTabs.Design)
  const handleLogicClick = () => setActiveTab(BuilderTabs.Logic)

  return {
    activeTab,
    isShowDrawer,
    draggableBasicFieldItems,
    setDraggableBasicFieldItems,
    handleClose,
    handleBuilderClick,
    handleDesignClick,
    handleLogicClick,
  }
}
