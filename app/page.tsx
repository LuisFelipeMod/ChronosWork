
import { title, subtitle } from "@/components/primitives";
import ActivitiesModal from "@/components/activitiesModal"

import { google } from "googleapis";

async function fetchSheet(method:string, range: string){
  const auth = await google.auth.getClient({ scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
  const sheets = google.sheets({version: "v4", auth});

  if (method === "GET"){
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range
    })

    const values = response.data.values 

    values?.shift()

    return values
  }

  return
}
 


export default async function Home() {

  interface Data {
    customers: string[][] | null | undefined
  }

  const data:Data = {
    customers: await fetchSheet('GET', `Clientes!A:A`),

  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Registre</span>
        <span className={title({ color: "blue" })}> suas atividades</span>
        <br />
        <span className={title()}>aqui</span>
      </div>

    <ActivitiesModal data={data}/>

    </section>
  );
}
