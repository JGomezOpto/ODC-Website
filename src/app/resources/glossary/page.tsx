import type { Metadata } from "next";
import { GlossaryClient } from "@/components/resources/GlossaryClient";

export const metadata: Metadata = {
  title: "Photonics Glossary — 200+ Terms Defined",
  description:
    "Complete glossary of photonics terminology: responsivity, quantum efficiency, EUV, APD, PbSe, NDIR, and 200+ terms defined for engineers.",
  alternates: { canonical: "/resources/glossary" },
};

export default function GlossaryPage() {
  return (
    <>
      <h1 className="sr-only">Photonics Glossary</h1>
      <GlossaryClient />
    </>
  );
}
