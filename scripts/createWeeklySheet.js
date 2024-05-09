import { sheets, spreadsheetId } from '../auth/googleAuth.js'

const dateRegex = new RegExp(/(\d{4})-(\d{2})-(\d{2}).*/)
const newSheetName = new Date().toISOString().match(dateRegex).slice(1,4).join("/")
const columns = ["Fun", "Fun-Notes", "Food", "Food-Notes", "Jea", "Jea-Notes", "Bills", "Bills-Notes", "Other", "Other-Notes"]

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
      range: `${newSheetName}!A1:J1`,
      valueInputOption: "USER_ENTERED",
      resource: { range: `${newSheetName}!A1:J1`, majorDimension: "ROWS", values: [columns] },
    }
    await sheets.spreadsheets.batchUpdate(addSheetRequest)
    await sheets.spreadsheets.values.update(addColumnsRequest)
  }

  catch(err) {
    console.log("readSheet func() error", err);  
  }
}

createWeeklySheet();