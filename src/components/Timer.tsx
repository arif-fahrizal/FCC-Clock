import { FunctionComponent } from 'react'
import { TimerState } from '../types'
import { TimeFormat } from './TimeFormat'

interface Props {
  timerState: TimerState
  reset: () => void
  startStop: (timerState: TimerState ) => void
}

const Timer: FunctionComponent<Props> = ({ timerState, reset, startStop }) => {
  return (
    <div id='timer'>
      <h2 id='timer-label'>{timerState.mode}</h2>
      <span id='time-left'>{TimeFormat(timerState.timeRemaining)}</span>
      <div>
        <button id='start_stop' onClick={() => startStop(timerState)} >
          {timerState.isRunning ? 'Pause' : 'Start' }
        </button>
        <button id='reset' onClick={reset} >Restart</button>
      </div>
    </div>
  )
}

export default Timer