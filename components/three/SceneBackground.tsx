"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type FieldUniforms = {
  uTime: { value: number };
  uMorphProgress: { value: number };
  uMouseDir: { value: THREE.Vector3 };
  uScrollProgress: { value: number };
};

function createSphere(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const r = 3 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

function createGrid(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const side = Math.ceil(Math.sqrt(count));
  for (let i = 0; i < count; i += 1) {
    const x = (i % side) - side / 2;
    const z = Math.floor(i / side) - side / 2;
    out[i * 3] = x * 0.08;
    out[i * 3 + 1] = (Math.random() - 0.5) * 0.12;
    out[i * 3 + 2] = z * 0.08;
  }
  return out;
}

function gaussian(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function createCluster(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    out[i * 3] = gaussian() * 0.7;
    out[i * 3 + 1] = gaussian() * 0.7;
    out[i * 3 + 2] = gaussian() * 0.7;
  }
  return out;
}

function createSpiral(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const t = (i / Math.max(1, count - 1)) * Math.PI * 12;
    const r = 0.08 * t;
    out[i * 3] = Math.cos(t) * r;
    out[i * 3 + 1] = Math.sin(t) * r;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }
  return out;
}

function MorphField() {
  const reducedMotion = useReducedMotion();
  const pointsRef = useRef<THREE.Points | null>(null);
  const mouse = useRef(new THREE.Vector3(0, 0, 0));
  const targetMouse = useRef(new THREE.Vector3(0, 0, 0));
  const sectionLerp = useRef(0);

  const isMobile = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  const count = isMobile ? 3000 : 12000;

  const base = useMemo(() => createSphere(count), [count]);
  const targets = useMemo(
    () => [createSphere(count), createGrid(count), createCluster(count), createSpiral(count)],
    [count]
  );

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const random = new Float32Array(count);
    for (let i = 0; i < count; i += 1) random[i] = Math.random();
    g.setAttribute("position", new THREE.BufferAttribute(base, 3));
    g.setAttribute("aTargetPosition", new THREE.BufferAttribute(new Float32Array(targets[0]), 3));
    g.setAttribute("aRandom", new THREE.BufferAttribute(random, 1));
    return g;
  }, [base, count, targets]);

  const uniforms = useMemo<FieldUniforms>(
    () => ({
      uTime: { value: 0 },
      uMorphProgress: { value: 0 },
      uMouseDir: { value: new THREE.Vector3(0, 0, 0) },
      uScrollProgress: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = -((event.clientY / window.innerHeight) * 2 - 1);
      targetMouse.current.set(nx, ny, 0).normalize();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const scrollTop = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

    const sectionFloat = scrollProgress * 3;
    const sectionIndex = Math.min(3, Math.max(0, Math.floor(sectionFloat)));
    const localMorph = Math.min(1, Math.max(0, sectionFloat - sectionIndex));

    const targetAttr = pointsRef.current.geometry.getAttribute("aTargetPosition") as THREE.BufferAttribute;
    const newTarget = targets[Math.min(3, sectionIndex + 1)] ?? targets[sectionIndex];
    targetAttr.array.set(newTarget);
    targetAttr.needsUpdate = true;

    if (!reducedMotion) {
      uniforms.uTime.value = state.clock.elapsedTime;
      uniforms.uScrollProgress.value = scrollProgress;
      sectionLerp.current = THREE.MathUtils.lerp(sectionLerp.current, localMorph, 0.06);
      uniforms.uMorphProgress.value = sectionLerp.current;
      mouse.current.lerp(targetMouse.current, 0.08);
      uniforms.uMouseDir.value.copy(mouse.current);
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uMorphProgress;
          uniform vec3 uMouseDir;
          uniform float uScrollProgress;
          attribute vec3 aTargetPosition;
          attribute float aRandom;
          varying vec3 vPosition;

          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod(i, 289.0);
            vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
            float n_ = 1.0/7.0;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }

          void main() {
            vec3 pos = mix(position, aTargetPosition, uMorphProgress);
            float noise = snoise(pos * 0.4 + uTime * 0.12) * 0.3;
            vec3 dir = normalize(pos + vec3(0.0001));
            pos += dir * noise;

            float mouseDist = length(pos.xy - uMouseDir.xy * 3.0);
            vec2 repel = normalize(pos.xy - uMouseDir.xy * 3.0) * (0.5 / max(mouseDist, 0.5));
            pos.xy += repel;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = mix(1.5, 3.0, aRandom) * (1.0 / -mvPosition.z);
            vPosition = pos;
          }
        `}
        fragmentShader={`
          varying vec3 vPosition;
          void main() {
            vec2 xy = gl_PointCoord - vec2(0.5);
            float r = length(xy);
            if (r > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.3, 0.5, r);
            vec3 purple = vec3(0.49, 0.23, 0.93);
            vec3 cyan = vec3(0.04, 0.72, 0.84);
            vec3 col = mix(purple, cyan, (vPosition.y + 3.0) / 6.0);
            gl_FragColor = vec4(col, alpha * 0.7);
          }
        `}
      />
    </points>
  );
}

export default function SceneBackground() {
  const reducedMotion = useReducedMotion();
  const isMobile = typeof navigator !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5], fov: 60 }}>
        <MorphField />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={isMobile ? 0.4 : 0.8} blendFunction={BlendFunction.ADD} />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={!isMobile && !reducedMotion ? new THREE.Vector2(0.0015, 0.0015) : new THREE.Vector2(0, 0)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.3} darkness={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
