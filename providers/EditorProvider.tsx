import { createContext, useContext, useState } from 'react'
import { AppNode } from '@/types/node.type'


type EditorState = {
  selectedNode: AppNode | null
  setSelectedNode: (node: AppNode | null) => void
}

const SidebarContext = createContext<EditorState | undefined>(undefined)

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedNode, setSelectedNode] = useState<AppNode | null>(null)

  return (
    <SidebarContext.Provider value={{ selectedNode, setSelectedNode }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useEditor = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useEditor must be used within a EditorProvider')
  }
  return context
}