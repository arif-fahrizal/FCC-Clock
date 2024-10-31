import { FunctionComponent, useEffect, useState } from 'react'
import './App.css'
import { TimeSetter } from './components/TimeSetter'
import Timer from './components/Timer'
import { TimerState } from './types'

const initialValueBreak: number = .05 * 60          //? 300s or 5mnt
const initialValueSession: number = .05 * 60       //? 1500s or 25mnt

const App: FunctionComponent = () => {
  const [breakLength, setBreakLength] = useState<number>(initialValueBreak)
  const [sessionLength, setSessionLength] = useState<number>(initialValueSession)
  const [timerState, setTimerState] = useState<TimerState>({
    time: sessionLength,
    timeType: 'Session',
    timeRunning: false
  })

  const audio = document.getElementById('beep') as HTMLAudioElement

  useEffect(() => {
    if (!timerState.timeRunning) return

    const timer: number = setInterval(() => {
        setTimerState((prev) => ({ ...prev, time: prev.time - 1 }))
      }, 1000)

    return () => clearInterval(timer)
  }, [timerState.timeRunning])

  useEffect(() => {
    if (timerState.time >= 0) return;

    audio.play()
    audio.currentTime = 2

    setTimerState( prev => ({
      ...prev,
      timeType: prev.timeType === 'Session' ? 'Break' : 'Session',
      time: prev.timeType === 'Session' ? breakLength : sessionLength
    }))
  }, [timerState, breakLength, sessionLength, audio])

  const reset = () => {
    setBreakLength(initialValueBreak)
    setSessionLength(initialValueSession)
    setTimerState({ time: initialValueSession, timeType: 'Session', timeRunning: false })
    audio.pause()
    audio.currentTime = 0
  }

  const startStop = () => {
    setTimerState((prev) => ({ ...prev, timeRunning: !prev.timeRunning }))
  }

  const changeTime = (type: 'break' | 'session', time: number) => {
    if (timerState.timeRunning) return;

    type === 'break' 
    ? setBreakLength(time) 
    : (setSessionLength(time), setTimerState({ time: time, timeType: 'Session', timeRunning: false }))
  }

  return (
    <div id='app'>
      <h1 id='title'>25 + 5 Clock</h1>
      <div id='length-control'>
        <div className='break'>
          <h2 id='break-label'>Break Length</h2>
          <TimeSetter time={breakLength} setTime={changeTime} type={'break'} />
        </div>
        <div className='session'>
          <h2 id='session-label'>Session Length</h2>
          <TimeSetter time={sessionLength} setTime={changeTime} type={'session'} />
        </div>
      </div>
      <Timer timerState={timerState} startStop={startStop} reset={reset} />
      <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" id='beep' />
    </div>
  )
}

export default App