import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

enum BuilderTabs {
  Builder,
  Design,
  Logic,
}

type BuilderPageContextProps = {
  activeTab: BuilderTabs | null
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

// Provider hook that creates auth object and handles state
const useProvidePageContext = (): BuilderPageContextProps => {
  const [activeTab, setActiveTab] = useState<BuilderTabs | null>(null)

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
    handleClose,
    handleBuilderClick,
    handleDesignClick,
    handleLogicClick,
  }
}
