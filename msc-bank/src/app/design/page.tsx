import type { Metadata } from "next";
import { Catalog } from "./Catalog";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

export default function DesignPage() {
  return <Catalog />;
}
