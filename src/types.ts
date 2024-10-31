export interface TimerState {
  timeRemaining: number
  mode: "Session" | "Break"
  isRunning: boolean
}