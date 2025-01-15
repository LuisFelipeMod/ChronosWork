import { title, subtitle } from "@/components/primitives";
import ActivitiesModal from "@/components/activities-modal";
import ProtectedPage from "@/components/protected-page";

import next from "next";

export default async function Home() {
  return (
    <ProtectedPage>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Registre</span>
          <span className={title({ color: "blue" })}> suas atividades</span>
          <br />
          <span className={title()}>aqui</span>
        </div>

        <ActivitiesModal btnLabel="Clique aqui"/>
      </section>
    </ProtectedPage>
  );
}