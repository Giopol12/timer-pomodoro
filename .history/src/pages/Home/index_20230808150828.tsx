import { Play } from 'phosphor-react'

import { useForm } from 'react-hook-form'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

export function Home() {
  const { register, handleSubmit, watch } = useForm()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleLogOnData(data: any) {
    console.log(data)
  }
  const task = watch('task')
  return (
    <HomeContainer>
      <form>
        <FormContainer onSubmit={handleSubmit(handleLogOnData)}>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />
          <label htmlFor="minutesAmount">durante</label>{' '}
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount')}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton disabled={!task} type="submit">
          <Play size={24} />
          Começar{' '}
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
