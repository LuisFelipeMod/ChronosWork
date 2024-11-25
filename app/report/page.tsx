"use client";

import { fetchSheets } from "@/components/fetchSheets";
import ProtectedPage from "@/components/ProtectedPage";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Report() {
  const user = localStorage.getItem("user");
  const [date, setDate] = useState([""]);
  const [start, setStart] = useState([""]);
  const [final, setFinal] = useState([""]);
  const [customers, setCustomers] = useState([""]);
  const [activity, setActivity] = useState([""]);

  useEffect(() => {
    fetchSheets("GET", `${user}!A:A`, "").then((response) => {
      const data = response.data;
      setDate(data.slice(-10));
    });
    fetchSheets("GET", `${user}!B:B`, "").then((response) => {
      const data = response.data;
      setStart(data.slice(-10));
    });
    fetchSheets("GET", `${user}!C:C`, "").then((response) => {
      const data = response.data;
      setFinal(data.slice(-10));
    });
    fetchSheets("GET", `${user}!D:D`, "").then((response) => {
      const data = response.data;
      setCustomers(data.slice(-10));
    });
    fetchSheets("GET", `${user}!E:E`, "").then((response) => {
      const data = response.data;
      setActivity(data.slice(-10));
    });
  }, []);

  return (
    <ProtectedPage>
      <Table aria-label="Tabela de atividades">
        <TableHeader>
          <TableColumn key="date">Data</TableColumn>
          <TableColumn key="start">Horário Inicial</TableColumn>
          <TableColumn key="final">Horário Final</TableColumn>
          <TableColumn key="customers">Clientes</TableColumn>
          <TableColumn key="activity">Descrição da Atividade</TableColumn>
        </TableHeader>
        <TableBody>
          {start.map((_, index) => (
            <TableRow key={index}>
              <TableCell>{date[index]}</TableCell>
              <TableCell>{start[index]}</TableCell>
              <TableCell>{final[index]}</TableCell>
              <TableCell>{customers[index]}</TableCell>
              <TableCell>{activity[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ProtectedPage>
  );
}