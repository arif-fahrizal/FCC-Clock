export const TimeFormat = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return `${String(minutes).padStart(2, minutes < 10 ? "0" : "6")}:${String(seconds).padStart(2, "0")}`
}
