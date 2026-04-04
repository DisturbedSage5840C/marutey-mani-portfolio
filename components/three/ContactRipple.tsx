"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RippleUniforms = {
  uRipples: { value: THREE.Vector2[] };
  uRippleTimes: { value: number[] };
  uTime: { value: number };
};

function RipplePlane({ ripplesRef, timesRef }: { ripplesRef: React.MutableRefObject<THREE.Vector2[]>; timesRef: React.MutableRefObject<number[]> }) {
  const reducedMotion = useReducedMotion();
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useMemo<RippleUniforms>(
    () => ({
      uRipples: { value: Array.from({ length: 8 }, () => new THREE.Vector2(-10, -10)) },
      uRippleTimes: { value: Array.from({ length: 8 }, () => -10) },
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uRipples.value = ripplesRef.current;
    uniforms.uRippleTimes.value = timesRef.current;
    if (reducedMotion) {
      uniforms.uTime.value = 0;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[8, 4, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec2 uRipples[8];
          uniform float uRippleTimes[8];
          uniform float uTime;
          varying vec2 vUv;

          void main() {
            vec3 col = vec3(0.0);
            for (int i = 0; i < 8; i++) {
              float elapsed = uTime - uRippleTimes[i];
              if (elapsed < 0.0 || elapsed > 2.0) continue;
              float dist = length(vUv - uRipples[i]);
              float wave = sin(dist * 30.0 - elapsed * 5.0) * exp(-dist * 8.0) * (1.0 - elapsed / 2.0);
              col += vec3(0.48, 0.14, 0.93) * wave * 0.5;
              col += vec3(0.02, 0.71, 0.83) * wave * 0.3;
            }
            gl_FragColor = vec4(col, length(col) * 0.6);
          }
        `}
      />
    </mesh>
  );
}

export default function ContactRipple({ ripplesRef, timesRef }: { ripplesRef: React.MutableRefObject<THREE.Vector2[]>; timesRef: React.MutableRefObject<number[]> }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-50">
      <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 3] }}>
        <RipplePlane ripplesRef={ripplesRef} timesRef={timesRef} />
      </Canvas>
    </div>
  );
}
