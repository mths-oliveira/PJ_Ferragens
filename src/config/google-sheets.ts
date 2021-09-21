import { google } from 'googleapis';

export const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
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
