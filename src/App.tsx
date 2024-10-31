import { FunctionComponent, useEffect, useState } from 'react'
import './App.css'
import { TimeSetter } from './components/TimeSetter'
import Timer from './components/Timer'
import { TimerState } from './types'

const initialBreakDuration: number = 5 * 60          //? 300s or 5mnt
const initialSessionDuration: number = 25 * 60       //? 1500s or 25mnt

const App: FunctionComponent = () => {
  const [breakDuration, setBreakDuration] = useState<number>(initialBreakDuration)
  const [sessionDuration, setSessionDuration] = useState<number>(initialSessionDuration)
  const [timerState, setTimerState] = useState<TimerState>({
    timeRemaining: sessionDuration,
    mode: 'Session',
    isRunning: false
  })

  const audio = document.getElementById('beep') as HTMLAudioElement

  useEffect(() => {
    if (!timerState.isRunning) return
  
    const timer: number = setInterval(() => {
      setTimerState( prev => {
        if (prev.timeRemaining <= 0) {

          audio.play();
          audio.currentTime = 2
  
          return {
            ...prev,
            mode: prev.mode === 'Session' ? 'Break' : 'Session',
            timeRemaining: prev.mode === 'Session' ? breakDuration : sessionDuration,
          }
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 }
      })
    }, 1000);
  
    return () => clearInterval(timer);
  }, [timerState.isRunning, timerState.timeRemaining, breakDuration, sessionDuration, audio]);
  

  const reset = () => {
    setBreakDuration(initialBreakDuration)
    setSessionDuration(initialSessionDuration)
    setTimerState({ timeRemaining: initialSessionDuration, mode: 'Session', isRunning: false })
    audio.pause()
    audio.currentTime = 0
  }

  const startStop = () => {
    setTimerState((prev) => ({ ...prev, isRunning: !prev.isRunning }))
  }

  const changeTime = (type: 'break' | 'session', time: number) => {
    if (timerState.isRunning) return

    type === 'break'
      ? setBreakDuration(time)
      : (setSessionDuration(time), setTimerState({ timeRemaining: time, mode: 'Session', isRunning: false }))
  }

  return (
    <div id='app'>
      <h1 id='title'>25 + 5 Clock</h1>
      <div id='length-control'>
        <div className='break'>
          <h2 id='break-label'>Break Length</h2>
          <TimeSetter time={breakDuration} setTime={changeTime} type={'break'} />
        </div>
        <div className='session'>
          <h2 id='session-label'>Session Length</h2>
          <TimeSetter time={sessionDuration} setTime={changeTime} type={'session'} />
        </div>
      </div>
      <Timer timerState={timerState} startStop={startStop} reset={reset} />
      <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" id='beep' />
    </div>
  )
}

export default App