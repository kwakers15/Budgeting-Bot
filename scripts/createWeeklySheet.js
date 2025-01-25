import { sheets, spreadsheetId } from '../auth/googleAuth.js'
import { formatDate } from '../util/common.js'
import { COLUMNS } from '../util/constants.js';

const newSheetName = formatDate(new Date().toLocaleString().split(",")[0])

async function createWeeklySheet() {
  try {
    const addSheetRequest = {
      // The ID of the spreadsheet
      spreadsheetId,
      resource: {
          requests: [{
             addSheet: {
                  // Add properties for the new sheet
                  properties: {
                      title: newSheetName,
                  }
              }
          }]
      }
    };

    const addColumnsRequest = {
      spreadsheetId,
      range: `${newSheetName}!A1:N1`,
      valueInputOption: "USER_ENTERED",
      resource: { range: `${newSheetName}!A1:N1`, majorDimension: "ROWS", values: [COLUMNS.flatMap(column => [column, column + " notes"])] },
    }
    await sheets.spreadsheets.batchUpdate(addSheetRequest)
    await sheets.spreadsheets.values.update(addColumnsRequest)
  }

  catch(err) {
    console.log(err.message);  
  }
}

createWeeklySheet()