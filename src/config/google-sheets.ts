import { google } from 'googleapis';
import credentials from '../../credentials.json';

export const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

export async function getSpreadsheets() {
  const client = await auth.getClient();
  const { spreadsheets } = google.sheets({
    version: 'v4',
    auth: client,
  });
  return spreadsheets;
}
