import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D Lipstick Component
const Lipstick = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Lipstick Base (Silver/Chrome) */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 1.2, 32]} />
        <meshStandardMaterial 
          color="#C0C0C0" 
          metalness={0.9} 
          roughness={0.1} 
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Lipstick Top Cap */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.8, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2} 
          envMapIntensity={1.2}
        />
      </mesh>
      
      {/* Lipstick Color (Rose Gold) */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.3, 16]} />
        <meshStandardMaterial 
          color="#E91E63" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {/* Decorative Ring */}
      <mesh position={[0, -0.3, 0]}>
        <torusGeometry args={[0.19, 0.02, 8, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

// Perfume Bottle Component
const PerfumeBottle = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + 1) * 0.15;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.6) * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={[2, 0, 0]}>
      {/* Bottle Body */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.25, 0.15, 0.8, 8]} />
        <meshPhysicalMaterial 
          color="#F8C8DC" 
          transparent={true} 
          opacity={0.8} 
          transmission={0.5}
          thickness={0.1}
        />
      </mesh>
      
      {/* Bottle Cap */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Perfume Liquid */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.22, 0.13, 0.6, 8]} />
        <meshStandardMaterial 
          color="#FF69B4" 
          transparent={true} 
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

// Compact Mirror Component
const CompactMirror = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + 2) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  return (
    <group ref={meshRef} position={[-2, 0, 0]}>
      {/* Mirror Base */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Mirror Surface */}
      <mesh position={[0, 0.03, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.01, 32]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          metalness={1} 
          roughness={0}
        />
      </mesh>
    </group>
  );
};

const BeautyProduct3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#FF69B4" />
        <pointLight position={[5, -5, -5]} intensity={0.3} color="#FFD700" />
        
        {/* Environment for reflections */}
        <Environment preset="studio" />
        
        {/* 3D Models */}
        <Lipstick />
        <PerfumeBottle />
        <CompactMirror />
        
        {/* Controls */}
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default BeautyProduct3D;