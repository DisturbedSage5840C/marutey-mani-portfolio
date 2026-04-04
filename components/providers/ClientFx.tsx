"use client";

import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(() => import("@/components/ui/ParticleCanvas"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });

export default function ClientFx() {
  return (
    <>
      <ParticleCanvas />
      <CustomCursor />
    </>
  );
}
