import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Float, Stars } from "@react-three/drei";

function Rails() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = mouse.x * 0.3;
    ref.current.rotation.x = -0.45 + mouse.y * 0.1;
    ref.current.position.z = (t * 2) % 4 - 2;
  });
  const ties = [];
  for (let i = -40; i < 40; i++) {
    ties.push(
      <mesh key={i} position={[0, 0, i * 1.2]}>
        <boxGeometry args={[2.4, 0.08, 0.3]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#22d3ee" emissiveIntensity={0.5} metalness={0.6} roughness={0.3} />
      </mesh>
    );
  }
  return (
    <group ref={ref} position={[0, -1, 0]} rotation={[-0.45, 0, 0]}>
      {/* rails */}
      <mesh position={[-0.9, 0.05, 0]}>
        <boxGeometry args={[0.12, 0.12, 100]} />
        <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={0.7} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.9, 0.05, 0]}>
        <boxGeometry args={[0.12, 0.12, 100]} />
        <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={0.7} metalness={0.9} roughness={0.2} />
      </mesh>
      {ties}
    </group>
  );
}

function FloatingTrain() {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={[0, 0.4, -3]} rotation={[0, Math.PI / 7, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.6, 0.7, 3.4]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0284c7" emissiveIntensity={0.35} metalness={0.85} roughness={0.25} />
        </mesh>
        {/* nose */}
        <mesh position={[0, 0, 1.95]}>
          <coneGeometry args={[0.65, 0.9, 24]} />
          <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={0.4} metalness={0.9} roughness={0.2} />
        </mesh>
        {/* windows */}
        {[-1, 0, 1].map((i) => (
          <mesh key={i} position={[0.81, 0.15, i * 0.9]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.6, 0.25]} />
            <meshStandardMaterial color="#fde68a" emissive="#fcd34d" emissiveIntensity={1.2} />
          </mesh>
        ))}
        {[-1, 0, 1].map((i) => (
          <mesh key={"l" + i} position={[-0.81, 0.15, i * 0.9]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[0.6, 0.25]} />
            <meshStandardMaterial color="#fde68a" emissive="#fcd34d" emissiveIntensity={1.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 600;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#22d3ee" transparent opacity={0.7} />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.6, 5.5], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0a0a14"]} />
      <fog attach="fog" args={["#0a0a14", 8, 22]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 6, 5]} intensity={40} color="#22d3ee" />
      <pointLight position={[-5, 4, -3]} intensity={30} color="#a78bfa" />
      <Suspense fallback={null}>
        <Stars radius={50} depth={30} count={1500} factor={3} fade speed={0.6} />
        <Rails />
        <FloatingTrain />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
