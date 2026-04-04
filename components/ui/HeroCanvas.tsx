"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  mouse: { x: number; y: number };
};

function FloatingM({ mouse }: Props) {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.003;

    const targetX = THREE.MathUtils.clamp(-mouse.y * 0.3, -0.3, 0.3);
    const targetY = THREE.MathUtils.clamp(mouse.x * 0.3, -0.3, 0.3);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <Text3D ref={meshRef as React.MutableRefObject<THREE.Mesh>} font="/fonts/helvetiker_bold.typeface.json" size={3} height={0.5} position={[-2, -1.4, 0]}>
      M
      <meshStandardMaterial metalness={0.8} roughness={0.2} color="#a78bfa" />
    </Text3D>
  );
}

export default function HeroCanvas({ mouse }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.4} />
        <FloatingM mouse={mouse} />
      </Canvas>
    </div>
  );
}
