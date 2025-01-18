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

export default function Report() {
  return (
    <ProtectedPage>
      <main className="container mx-auto max-w-7xl px-6 flex flex-grow justify-center">
        <section className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <DataTable />
        </section>
      </main>
    </ProtectedPage>
  );
}
