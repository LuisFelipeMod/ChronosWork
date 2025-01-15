import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SECRET_KEY = process.env.SECRET_KEY || "sua-chave-secreta";

async function getUsers() {
  const credentials = {
    client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
  };

  const auth = await google.auth.getClient({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GCP_SHEET_ID,
    range: "DevsLogin!A:B",
  });

  const values = response.data.values;

  values?.shift();
  return values;
}

export async function POST(req: NextRequest) {
  const { method, username, password } = await req.json();
  const users = await getUsers();
  const user = users?.find(
    (user) => user[0] === username && user[1] === password
  );

  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return new Response(JSON.stringify({ token, username }), { status: 200 });
  } else {
    return new Response("Credenciais inválidas", { status: 401 });
  }
}
