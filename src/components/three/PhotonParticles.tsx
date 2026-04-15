"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 200;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Spread particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 5;

      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      // Slow drift velocities
      vel[i3] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.005;

      // Red-shifted colors (primary brand color)
      const intensity = 0.4 + Math.random() * 0.6;
      col[i3] = intensity; // R
      col[i3 + 1] = intensity * 0.15; // G (muted)
      col[i3 + 2] = intensity * 0.15; // B (muted)
    }

    return [pos, vel, col];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry;
    const posAttr = geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Slow orbital drift
      posArray[i3] += velocities[i3] + Math.sin(time * 0.2 + i) * 0.001;
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.15 + i) * 0.001;
      posArray[i3 + 2] += velocities[i3 + 2];

      // Keep particles within bounds
      const dist = Math.sqrt(
        posArray[i3] ** 2 +
        posArray[i3 + 1] ** 2 +
        posArray[i3 + 2] ** 2
      );
      if (dist > 8) {
        posArray[i3] *= 0.98;
        posArray[i3 + 1] *= 0.98;
        posArray[i3 + 2] *= 0.98;
      }
    }

    posAttr.needsUpdate = true;

    // Slow rotation of the entire system
    meshRef.current.rotation.y = time * 0.03;
    meshRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    // Create some subtle connecting lines between random point pairs
    const lineCount = 30;
    const pos = new Float32Array(lineCount * 6);

    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const r1 = 3 + Math.random() * 4;

      const theta2 = theta1 + (Math.random() - 0.5) * 0.5;
      const phi2 = phi1 + (Math.random() - 0.5) * 0.5;
      const r2 = r1 + (Math.random() - 0.5) * 2;

      pos[i6] = r1 * Math.sin(phi1) * Math.cos(theta1);
      pos[i6 + 1] = r1 * Math.sin(phi1) * Math.sin(theta1);
      pos[i6 + 2] = r1 * Math.cos(phi1);

      pos[i6 + 3] = r2 * Math.sin(phi2) * Math.cos(theta2);
      pos[i6 + 4] = r2 * Math.sin(phi2) * Math.sin(theta2);
      pos[i6 + 5] = r2 * Math.cos(phi2);
    }

    return pos;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#ef4444"
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export function PhotonParticles() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        style={{ background: "transparent" }}
      >
        <Particles />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
