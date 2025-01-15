import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface Sheets {
  spreadsheets: {
    values: {
      get: any;
    };
  };
}

async function fetchSheet(method: string, range: string, valueToSet: any) {
  const credentials = {
    client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY,
  };

  const auth = await google.auth.getClient({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  
  const sheets = google.sheets({ version: "v4", auth });
  let values = null;

  if (method === "GET") values = await getSheet(sheets, range);
  else if (method === "PUT") values = await setSheet(sheets, range, valueToSet);

  return values;
}

async function getSheet(sheets: Sheets, range: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GCP_SHEET_ID,
    range,
  });

  const values = response.data.values;
  values?.shift();
  return values;
}

async function setSheet(sheets: any, range: string, valueToSet: any) {
  const request = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GCP_SHEET_ID,
    range,
    valueInputOption: `USER_ENTERED`,
    includeValuesInResponse: true,
    resource: {
      values: [[valueToSet]],
    },
  });

  return request;
}

export async function POST(request: NextRequest) {
  const { method, range, valueToSet } = await request.json();

  try {
    const values = await fetchSheet(method, range, valueToSet);
    return NextResponse.json({ data: values });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data from Google Sheets" }, { status: 500 });
  }
}
