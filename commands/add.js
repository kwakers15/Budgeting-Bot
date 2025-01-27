import { sheets, spreadsheetId } from '../auth/googleAuth.js'
import niv from 'node-input-validator';
import { getNextCell, getAllSheets, COLUMNS, START_DATE, convertDateToNum, convertDateToISONum } from '../util/index.js';

niv.extendMessages({
  required: 'The :attribute field must not be empty.',
  regex: 'The :attribute field must be in the format X.XX',
  accepted: `The column must be one of these fields: (${COLUMNS.join(' | ')})`
})

// const findMostRecentWeek = (sheetNames, date) => {
//   const recentIndex = sheetNames.findIndex(sheet => date < convertDateToNum(sheet))
//   return recentIndex == -1 ? sheetNames.slice(-1) : sheetNames[recentIndex-1]
// }

const addEntry = async (column, amount, date) => {
  const values = [
    [ amount ]
  ];
  const cell = await getNextCell(column, date);

  try {
    sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${date}!${cell}`,
      valueInputOption: 'USER_ENTERED',
      resource: { values }
    })
  } catch (err) {
    console.log(err);
  }
}

// const parseOptionals = (optionals) => {
//   let date = null;
//   let notes = null;
//   let i = 0;
//   while (i < optionals.length) {
//     if (optionals[i] == '-d') {
//       date = optionals[i]
//     }
//   }
// }

const add = async (message, column, amount) => {
  console.log(message, column, amount)
  const v = new niv.Validator({ column, amount }, {
    column: `required|accepted:${COLUMNS.join(',')}`,
    amount: ['required', 'regex:^([0-9]+\.[0-9]{2}|[0-9]+)$'],
  })

  if (!await v.check()) {
    const errors = Object.keys(v.errors).map(key => v.errors[key].message).join('\n');

    message.reply(`Usage: !add <column> <amount> [date mmddyyyy]\n\n${errors}`);
    return;
  }

  // if (date && convertDateToISONum(date) < START_DATE) {
  //   message.reply('The date provided is too far in the past.');
  //   return;
  // }

  const sheetNames = await getAllSheets();
  let validatedDate = null;
  // if (!date) {
    validatedDate = sheetNames.slice(-1);
  // }
  // else {
    // validatedDate = findMostRecentWeek(sheetNames, date); 
  // }
  
  addEntry(column, amount, validatedDate);
  message.reply('added!');
}

export const addCommand = {
  execute: add
}