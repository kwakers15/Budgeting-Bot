export const convertDateToNum = (date) => {
  return parseInt(date.replaceAll("/", ""))
}

// date is given in m/dd/yyyy or mm/d/yyyy
export const formatDate = (date) => {
  return date.split("/").map(token => {
    if (token.length == 1) {
      return "0" + token
    }
    return token
  }).join("/")
}

// date is given in mmddyyyy
export const convertDateToISONum = (date) => {
  return parseInt(date.substring(4) + date.substring(0, 2) + date.substring(2, 4))
}