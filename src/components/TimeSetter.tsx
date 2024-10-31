import { FunctionComponent } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

interface Props {
  time: number
  type: "session" | "break"
  setTime: (type: Props['type'], time: number) => void
}

export const TimeSetter: FunctionComponent<Props> = ({time, setTime, type}) => {
  const min: number = 60          //? 60s or 1mnt
  const max: number = 60 * 60     //? 3600s or 60mnt

  return (
    <div className='timesetter'>
      <button id={`${type}-decrement`} onClick={() => (time > min ? setTime(type, time - min) : null)}><FaArrowDown size={20} /></button>
      <span id={`${type}-length`}>{time / min}</span>
      <button id={`${type}-increment`} onClick={() => (time < max ? setTime(type, time + min) : null)}><FaArrowUp size={20} /></button>
    </div>
  )
}
