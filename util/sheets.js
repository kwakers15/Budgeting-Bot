import { sheets, spreadsheetId } from '../auth/googleAuth.js';

export const getNextCell = async (column, date) => {
  try {
    // get values of all cells in row 1
    const firstRowResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${date}!1:1`,
    })
    const rowValues = firstRowResponse.data.values[0].map(value => value.toLowerCase())

    // see which cell the column matches with -> this gives us the letter
    const letter = String.fromCharCode(65 + rowValues.findIndex(e => e === column))

    // get the column values of that column
    const colResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${date}!${letter}:${letter}`
    })
    const colValues = colResponse.data.values

    // return the row value of the last cell + 1
    return letter + (colValues.length + 1).toString();
  } catch (err) {
    console.log(err);
  }
}

export const getAllSheets = async () => {
  try {
    const sheetsResponse = await sheets.spreadsheets.get({
      spreadsheetId
    })
    return sheetsResponse.data.sheets.map(sheet => sheet.properties.title);
  } catch (err) {
    console.log(err);
  }
}