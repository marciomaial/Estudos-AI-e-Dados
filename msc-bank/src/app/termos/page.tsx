import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Termos de uso" };

export default function Termos() {
  return (
    <LegalPage title="Termos de uso">
      <p>Os termos de uso da beta estão em revisão jurídica e serão publicados antes do início das operações com o piloto.</p>
      <p>Eles vão cobrir o papel do MSC Bank como plataforma de originação, a cessão de crédito ao financiador parceiro e o aceite eletrônico.</p>
    </LegalPage>
  );
}
