require('dotenv').config()
const { google } = require('googleapis');

const clientEmail = process.env.GAPI_SERVICE_EMAIL;
const privateKey = process.env.GAPI_PRIVATE_KEY;
const spreadsheetId = process.env.SHEET_ID;
const googleApiURL = 'https://www.googleapis.com/auth/spreadsheets'


// authenticate the service account
const googleAuth = new google.auth.JWT(
  clientEmail,
  null,
  privateKey.replace(/\\n/g, '\n'),
  googleApiURL
);

module.exports = {
  googleAuth,
  spreadsheetId
}