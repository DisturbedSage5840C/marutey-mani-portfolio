"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ── Distorted core sphere ──────────────────────────────────────
function CoreSphere() {
  const reducedMotion = useReducedMotion();
  const meshRef = useRef<THREE.Mesh | null>(null);
  const target  = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || reducedMotion) return;
    const t  = clock.elapsedTime;
    const tx = THREE.MathUtils.clamp(target.current.y * 0.25, -0.25, 0.25);
    const ty = THREE.MathUtils.clamp(target.current.x * 0.25, -0.25, 0.25);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, tx + t * 0.06, 0.04);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, ty + t * 0.04, 0.04);
  });

  const segments = useMemo(() => {
    if (typeof navigator !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return 28;
    return 72;
  }, []);

  return (
    <mesh ref={meshRef}>
      {/* Smaller radius (1.0 vs 1.35) keeps it contained */}
      <sphereGeometry args={[1.0, segments, segments]} />
      <MeshDistortMaterial
        color="#5b21b6"
        distort={0.45}
        speed={1.8}
        metalness={0.92}
        roughness={0.1}
        emissive="#2e1065"
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

// ── Single slim orbiting ring ──────────────────────────────────
function OrbitRing() {
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.z = t * 0.15;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.55, 0.012, 6, 100]} />
      <meshBasicMaterial color="#a855f7" opacity={0.28} transparent />
    </mesh>
  );
}

// ── Sparse particle halo ────────────────────────────────────────
function ParticleHalo() {
  const ref = useRef<THREE.Points | null>(null);

  const geometry = useMemo(() => {
    const count = 280;
    const positions = new Float32Array(count * 3);
    const randoms   = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.3 + Math.random() * 0.9;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      randoms[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRandom",  new THREE.BufferAttribute(randoms, 1));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.05;
    ref.current.rotation.x = clock.elapsedTime * 0.025;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float aRandom;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position  = projectionMatrix * mv;
            gl_PointSize = mix(0.8, 2.0, aRandom) * (250.0 / -mv.z);
          }
        `}
        fragmentShader={`
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float a = 1.0 - smoothstep(0.15, 0.5, d);
            vec3 col = mix(vec3(0.6, 0.27, 0.92), vec3(0.13, 0.72, 0.88), gl_PointCoord.x);
            gl_FragColor = vec4(col, a * 0.32);
          }
        `}
      />
    </points>
  );
}

export default function HeroSphere() {
  const reducedMotion = useReducedMotion();
  const isMobile = typeof navigator !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    // Narrower (50%) and camera pulled back (z=6) — sphere stays right half, far smaller on screen
    <div className="pointer-events-none absolute right-0 top-0 h-full w-[50%] z-0">
      <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5.5] }}>
        {/* Softer, lower-intensity lights — no cyan bleed */}
        <pointLight position={[5, 6, 3]}   color="#7c3aed" intensity={1.1} />
        <pointLight position={[-4, -4, -3]} color="#4c1d95" intensity={0.6} />
        <Environment preset="night" />
        <CoreSphere />
        {!reducedMotion && (
          <>
            <OrbitRing />
            {!isMobile && <ParticleHalo />}
          </>
        )}
      </Canvas>
    </div>
  );
}
