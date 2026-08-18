import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Book({ color, rotation = [0, 0, 0], position = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Top Cover */}
      <mesh position={[0, 0.07, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.02, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
      </mesh>
      {/* Bottom Cover */}
      <mesh position={[0, -0.07, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.02, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
      </mesh>
      {/* Spine */}
      <mesh position={[-1.09, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 0.16, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
      </mesh>
      {/* Pages */}
      <mesh position={[0.05, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.12, 1.54]} />
        <meshStandardMaterial color="#fffcee" roughness={0.8} metalness={0.0} />
      </mesh>
    </group>
  );
}

function FloatingBookStack({ isMobile }) {
  const groupRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // 1. Gentle floating animation (bobbing)
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(elapsed * 1.2) * 0.18;

      // 2. Mouse position follow/tilt (only on desktop to optimize battery/perf)
      if (!isMobile) {
        const targetX = state.pointer.x * 0.25;
        const targetY = state.pointer.y * 0.25;
        
        // Lerp rotation to smoothly follow mouse
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.08);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -targetX, 0.08);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Book 1 - Bottom (Deep Purple/Indigo) */}
      <Book color="#5B3BE6" position={[0, -0.22, 0]} rotation={[0, Math.PI / 12, 0]} />

      {/* Book 2 - Middle (Turquoise/Primary) */}
      <Book color="#00D1BB" position={[0.02, 0, 0.03]} rotation={[0, -Math.PI / 18, 0]} />

      {/* Book 3 - Top (Slate Blue/Theme Primary) */}
      <Book color="#417094" position={[-0.01, 0.22, -0.02]} rotation={[0, Math.PI / 24, 0]} />
    </group>
  );
}

export default function Hero3DCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-[320px] sm:h-[420px] cursor-grab active:cursor-grabbing relative">
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 4.0], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Lights */}
        <ambientLight intensity={0.7} />
        
        {/* Key Light (Directional, casts soft shadows) */}
        <directionalLight
          position={[5, 8, 4]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        {/* Back/Rim light for depth */}
        <pointLight position={[-5, 3, -5]} intensity={0.4} />

        {/* Fill light */}
        <directionalLight position={[-4, 2, 2]} intensity={0.3} />

        {/* Floating Book Stack */}
        <FloatingBookStack isMobile={isMobile} />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={isMobile ? 1.0 : 1.5}
          enableRotate={!isMobile} // Disable manual drag rotation on mobile to protect swipe gestures
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
