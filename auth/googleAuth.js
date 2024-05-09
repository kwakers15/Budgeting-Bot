import 'dotenv/config'
import { google } from 'googleapis';

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

const sheets = await google.sheets({ version: 'v4', auth: googleAuth});

export {
  sheets,
  spreadsheetId
}