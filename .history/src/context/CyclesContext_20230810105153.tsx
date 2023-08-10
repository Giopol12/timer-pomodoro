import { ReactNode, createContext } from 'react'

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCyleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  return <CyclesContext.Provider>{children}</CyclesContext.Provider>
}
