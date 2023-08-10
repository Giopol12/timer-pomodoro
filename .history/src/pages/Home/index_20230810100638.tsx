import { Play, HandPalm } from 'phosphor-react'
// import { useForm } from 'react-hook-form'

// import { zodResolver } from '@hookform/resolvers/zod'

// import * as zod from 'zod'

import {
  EndCountdownButton,
  HomeContainer,
  StartCountdownButton,
} from './styles'
import { createContext, useState } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCyleAsFinished: () => void
}
export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // const newCycleFormValidationSchema = zod.object({
  //   task: zod.string().min(1),
  //   minutesAmount: zod.number().min(1).max(60),
  // })

  // type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  // const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
  //   resolver: zodResolver(newCycleFormValidationSchema),
  //   defaultValues: { task: '', minutesAmount: 0 },
  // })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime())
  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }
  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)

  //   reset()
  // }
  function markCurrentCyleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptDate: new Date(),
          }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }

  // const task = watch('task')
  // const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */>
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCyleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <EndCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </EndCountdownButton>
        ) : (
          <StartCountdownButton /* disabled={isSubmitDisable} */ type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
