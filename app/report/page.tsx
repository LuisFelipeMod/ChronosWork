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
import DataTable from "@/components/data-table"
import { useEffect, useState } from "react";

export default function Report() {
  return (
    <ProtectedPage>
      <DataTable />
    </ProtectedPage>
  );
}