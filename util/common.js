export const convertDateToNum = (date) => {
  return parseInt(date.replaceAll("/", ""))
}