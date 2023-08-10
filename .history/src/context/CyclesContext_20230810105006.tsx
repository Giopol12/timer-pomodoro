interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCyleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}
export const CyclesContext = createContext({} as CyclesContextType)
