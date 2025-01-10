import { title, subtitle } from "@/components/primitives";
import ActivitiesModal from "@/components/activitiesModal";
import ProtectedPage from "@/components/ProtectedPage";

import { google } from "googleapis";
import next from "next";

export default async function Home() {
  return (
    <ProtectedPage>
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Registre</span>
          <span className={title({ color: "blue" })}> suas atividades</span>
          <br />
          <span className={title()}>aqui</span>
        </div>

        <ActivitiesModal/>
      </section>
    </ProtectedPage>
  );
}
