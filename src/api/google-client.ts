import { Auth, sheets_v4 } from 'googleapis';
import { combineListsIntoObject } from '../utils/combineListsIntoObject';

export class GoogleClient {
  constructor(
    protected auth: Auth.GoogleAuth,
    protected spreadsheets: sheets_v4.Resource$Spreadsheets,
    protected spreadsheetId: string
  ) {}

  async add(sheet: string, values: string[]) {
    await this.spreadsheets.values.append({
      auth: this.auth,
      range: sheet,
      spreadsheetId: this.spreadsheetId,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [values] },
    });
  }

  async findAll<T = any>(sheet: string) {
    const response = await this.spreadsheets.values.get({
      auth: this.auth,
      range: sheet,
      spreadsheetId: this.spreadsheetId,
    });
    const [header, ...records] = response.data.values;
    const data: T[] = records.map((record) => {
      const object = combineListsIntoObject<T>(header, record);
      return object;
    });
    return data;
  }

  async findColumns<T = any>(sheet: string) {
    const response = await this.spreadsheets.values.get({
      auth: this.auth,
      range: sheet,
      majorDimension: 'COLUMNS',
      spreadsheetId: this.spreadsheetId,
    });
    let object = {} as T;
    for (const [key, ...values] of response.data.values) {
      object[key] = values;
    }
    return object;
  }
}
