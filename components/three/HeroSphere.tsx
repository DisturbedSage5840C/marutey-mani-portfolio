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
  const target = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      target.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || reducedMotion) return;
    const t = clock.elapsedTime;
    const tx = THREE.MathUtils.clamp(target.current.y * 0.3, -0.3, 0.3);
    const ty = THREE.MathUtils.clamp(target.current.x * 0.3, -0.3, 0.3);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, tx + t * 0.07, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, ty + t * 0.05, 0.05);
  });

  const segments = useMemo(() => {
    if (typeof navigator !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return 32;
    return 80;
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.35, segments, segments]} />
      <MeshDistortMaterial
        color="#6d28d9"
        distort={0.5}
        speed={2.2}
        metalness={0.95}
        roughness={0.08}
        emissive="#3b0764"
        emissiveIntensity={0.45}
      />
    </mesh>
  );
}

// ── Orbiting torus ring ────────────────────────────────────────
function OrbitRing() {
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * 0.35;
    ref.current.rotation.z = t * 0.18;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.0, 0.018, 8, 120]} />
      <meshBasicMaterial color="#a855f7" opacity={0.35} transparent />
    </mesh>
  );
}

// ── Second tilted ring ─────────────────────────────────────────
function OrbitRing2() {
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = t * 0.28;
    ref.current.rotation.x = Math.PI / 3 + t * 0.1;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.4, 0.012, 6, 100]} />
      <meshBasicMaterial color="#22d3ee" opacity={0.2} transparent />
    </mesh>
  );
}

// ── Particle halo ─────────────────────────────────────────────
function ParticleHalo() {
  const ref = useRef<THREE.Points | null>(null);

  const { geometry } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const randoms   = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.7 + Math.random() * 1.2;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      randoms[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRandom",  new THREE.BufferAttribute(randoms, 1));
    return { geometry: geo };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.06;
    ref.current.rotation.x = clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          attribute float aRandom;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position  = projectionMatrix * mv;
            gl_PointSize = mix(1.0, 2.5, aRandom) * (300.0 / -mv.z);
          }
        `}
        fragmentShader={`
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float a = 1.0 - smoothstep(0.2, 0.5, d);
            vec3 purple = vec3(0.66, 0.33, 0.97);
            vec3 cyan   = vec3(0.13, 0.83, 0.93);
            vec3 col = mix(purple, cyan, gl_PointCoord.x);
            gl_FragColor = vec4(col, a * 0.55);
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
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 4.5] }}>
        <pointLight position={[8, 8, 4]}   color="#7c3aed" intensity={2.2} />
        <pointLight position={[-8, -6, -4]} color="#06b6d4" intensity={1.6} />
        <pointLight position={[0, 10, 2]}   color="#b8a0f0" intensity={0.8} />
        <Environment preset="night" />
        <CoreSphere />
        {!reducedMotion && (
          <>
            <OrbitRing />
            {!isMobile && <OrbitRing2 />}
            <ParticleHalo />
          </>
        )}
      </Canvas>
    </div>
  );
}
