import { Console } from "console";

export async function fetchSheets(
  method: string,
  range: string, // Ex: Pagina1!A:A
  valueToSet: any // Valor a ser inserido, caso o metodo for PUT
) {
  const res = await fetch("/api/sheets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ method, range, valueToSet }),
  });

  const data = await res.json();
  return data;
}

export async function setNextCell(
  sheetTitle: string,
  columnId: string,
  value: string
) {
  let data: any = await fetchSheets(
    "GET",
    sheetTitle + "!" + columnId + ":" + columnId,
    ""
  );

  for (const prop in data) {
    const dataValue = data[prop];
    data[prop] = [];

    if (dataValue) {
      dataValue.forEach((cell: string) => {
        data[prop].push(cell[0]);
      });
    }

    const nextCell =
      sheetTitle + "!" + columnId + String(data[prop].length + 2);

    try {
      await fetchSheets("PUT", nextCell, value);

      return;
    } catch (error) {
      return console.error(error);
    }
  }
}
