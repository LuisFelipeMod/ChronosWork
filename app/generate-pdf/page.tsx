"use client";

import "@/styles/generate-pdf.css";
import { FolderDown } from 'lucide-react';
import { LayoutChart } from "@/components/layout-chart";
import { Button } from "@nextui-org/button";

export default function GeneratePDF() {
  return (
    <section className="pdf w-full h-auto">
      <div className="pdf-header pt-10">
        <div>
          <td className="pdf-title text-4xl">Relatório de atividades</td>
          <hr />
        </div>
      </div>
      <div className="pdf-body pt-6 block">
        <div className="pdf-box w-full">
          <div className="pdf-content pb-6">
            <LayoutChart />
          </div>
          <Button startContent={ <FolderDown opacity={0.5} /> } variant="solid" onClick={() => window.print()}>
            Baixar PDF
          </Button>
        </div>
      </div>
    </section>
  );
}
