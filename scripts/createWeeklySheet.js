const { google } = require('googleapis');
const { googleAuth, spreadsheetId } = require('../auth/googleAuth')

const dateRegex = new RegExp(/(\d{4})-(\d{2})-(\d{2}).*/)
const newSheetName = new Date().toISOString().match(dateRegex).slice(1,4).join("/")
const columns = ["Entertainment", "Food", "Jea", "Bills", "Other"]

async function createWeeklySheet() {
  try {
    // google sheet instance
    const sheets = await google.sheets({ version: 'v4', auth: googleAuth});

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
      range: `${newSheetName}!A1:E1`,
      valueInputOption: "USER_ENTERED",
      resource: { range: `${newSheetName}!A1:E1`, majorDimension: "ROWS", values: [columns] },
    }
    await sheets.spreadsheets.batchUpdate(addSheetRequest)
    await sheets.spreadsheets.values.update(addColumnsRequest)
  }

  catch(err) {
    console.log("readSheet func() error", err);  
  }
}

createWeeklySheet();