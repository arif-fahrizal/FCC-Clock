import { FunctionComponent } from 'react'
import { FaPause, FaPlay, FaUndo } from 'react-icons/fa'
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
      <h2 id='timer-label'>{timerState.timeType}</h2>
      <span id='time-left'>{TimeFormat(timerState.time)}</span>
      <div>
        <button id='start_stop' onClick={() => startStop(timerState)} style={{ backgroundColor: "#4361ee"}}>
          {timerState.timeRunning ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
        <button id='reset' onClick={reset} style={{ backgroundColor: "#ff0054"}}><FaUndo size={20} /></button>
      </div>
    </div>
  )
}

export default Timer