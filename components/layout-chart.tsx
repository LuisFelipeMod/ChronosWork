"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { fetchSheets } from "./fetch-sheets";

export function LayoutChart() {
  interface CellsItem {
    initial: string;
    final: string;
    customer: string;
  }

  const [cells, setCells] = useState<CellsItem[] | []>([]);

  useEffect(() => {
    const selectedEmployee = localStorage.getItem("selectedEmployee");

    fetchSheets("GET", `${selectedEmployee}!B:D`, "").then((response) => {
      const data = response.data;

      if (data) {
        const newCells = data.map((e: any) => ({
          initial: e[0],
          final: e[1],
          customer: e[2],
        }));
        setCells(newCells);
      }
    });
  }, []);

  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const calculateTimeDifferenceInMinutes = (
    firstTime: string,
    secondTime: string
  ) => {
    const firstTimeInMinutes: number = convertTimeToMinutes(firstTime);
    const secondTimeInMinutes: number = convertTimeToMinutes(secondTime);

    const differenceInMinutes: number = Math.abs(
      firstTimeInMinutes - secondTimeInMinutes
    );

    return differenceInMinutes;
  };

  const chartData: any = [["Nome do cliente", "Horas gastas"]];

  // Agrupar dados por cliente
  const groupedData = cells.reduce(
    (acc, cell) => {
      const customerName = cell.customer;
      const differenceInMinutes = calculateTimeDifferenceInMinutes(
        cell.initial,
        cell.final
      );

      if (!acc[customerName]) {
        acc[customerName] = 0;
      }

      acc[customerName] += differenceInMinutes;

      return acc;
    },
    {} as Record<string, number>
  );

  // Converter minutos totais para horas e formatar para o gráfico
  Object.entries(groupedData).forEach(([customerName, minutes]) => {
    const diffHours = Math.floor(minutes / 60);
    const diffMinutes = minutes % 60;

    chartData.push([customerName, Number(`${diffHours}.${diffMinutes}`)]);
  });

  return (
    <Chart
      width={"100%"}
      height={"30rem"}
      chartType="BarChart"
      loader={<div>Carregando gráfico...</div>}
      data={chartData}
      options={{
        colors: ["#0147fe"],
        legend: { position: "bottom", textStyle: { color: "#fff" } },
        bar: { groupWidth: "80%" },
        backgroundColor: "#0d0d15",
        chartArea: {
          width: "100%",
          left: 0,
        },
        vAxis: {
          textPosition: "in",
          direction: -1,
          textStyle: {
            color: "#fff",
            fontSize: 16,
            bold: true,
            stroke: false,
            italic: true,
          },
        },
      }}
      rootProps={{ "data-testid": "6" }}
      chartPackages={["corechart", "controls"]}
      render={({ renderControl, renderChart }) => {
        return (
          <div
            style={{ display: "flex", height: "100%", flexDirection: "column" }}
          >
            <div>{renderControl(() => true)}</div>
            <div>{renderChart()}</div>
            <div>{/* selectedEmployee ? hoursSpent(selectedEmployee) : <></>*/}</div>
          </div>
        );
      }}
    />
  );
}
