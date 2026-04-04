"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function SphereMesh() {
  const reducedMotion = useReducedMotion();
  const meshRef = useRef<THREE.Mesh | null>(null);
  const target = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      target.current.set((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current || reducedMotion) return;

    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x += 0.001;

    const tx = THREE.MathUtils.clamp(target.current.y * 0.3, -0.3, 0.3);
    const ty = THREE.MathUtils.clamp(target.current.x * 0.3, -0.3, 0.3);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, tx, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, ty, 0.05);
  });

  const segments = useMemo(() => {
    if (typeof navigator !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      return 32;
    }
    return 64;
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.4, segments, segments]} />
      <MeshDistortMaterial
        color="#7c3aed"
        distort={0.45}
        speed={2}
        metalness={0.9}
        roughness={0.1}
        emissive="#4c1d95"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export default function HeroSphere() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 4] }}>
        <pointLight position={[10, 10, 5]} color="#7c3aed" intensity={1.6} />
        <pointLight position={[-10, -10, -5]} color="#06b6d4" intensity={1.2} />
        <Environment preset="city" />
        <SphereMesh />
      </Canvas>
    </div>
  );
}
