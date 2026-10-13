import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Política de privacidade" };

export default function Privacidade() {
  return (
    <LegalPage title="Política de privacidade">
      <p>A política de privacidade completa está em revisão e será publicada antes do início do piloto.</p>
      <p>
        Na lista de interesse, coletamos apenas perfil, CNPJ e e-mail, usados exclusivamente para contato sobre a beta. Você pode pedir a
        exclusão desses dados a qualquer momento.
      </p>
    </LegalPage>
  );
}
