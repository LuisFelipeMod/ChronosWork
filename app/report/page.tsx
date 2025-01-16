"use client";

import ProtectedPage from "@/components/protected-page";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import DataTable from "@/components/data-table";
import { useEffect, useState } from "react";
import { fetchSheets } from "@/components/fetch-sheets";
import DataTableManager from "@/components/data-table-manager";

export default function Report() {
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const user = userStorage ? JSON.parse(userStorage) : null;
    const username = user.username;

    const getUserRole = async () => {
      const response = await fetchSheets("GET", `DevsLogin!A:C`, "");
      const userRole = response.data.find((item: any) => item[0] === username);
      setIsManager(userRole[2] === "Sim");
    };

    getUserRole();
  }, []);

  return (
    <ProtectedPage>
      <main className="container mx-auto max-w-7xl px-6 flex flex-grow justify-center">
        <section className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          {isManager ? <DataTableManager /> : <DataTable />}
        </section>
      </main>
    </ProtectedPage>
  );
}
