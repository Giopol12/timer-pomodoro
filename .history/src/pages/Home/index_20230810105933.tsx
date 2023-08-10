import { Play, HandPalm } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import * as zod from 'zod'

import {
  EndCountdownButton,
  HomeContainer,
  StartCountdownButton,
} from './styles'
import { useContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../context/CyclesContext'

export function Home() {
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1),
    minutesAmount: zod.number().min(1).max(60),
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: { task: '', minutesAmount: 0 },
  })

  const { activeCycle, interruptCycle, createNewCycle } =
    useContext(CyclesContext)

  const { handleSubmit, watch /* reset */ } = newCycleForm

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <EndCountdownButton onClick={interruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </EndCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
