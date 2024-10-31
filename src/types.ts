export interface TimerState {
  time: number
  timeType: "Session" | "Break"
  timeRunning: boolean
}