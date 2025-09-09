import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Lightweight 3D Lipstick Component - optimized for mobile
const Lipstick = ({ reducedQuality }: { reducedQuality: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  const segments = reducedQuality ? 16 : 32;

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Lipstick Base (Silver/Chrome) */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 1.2, segments]} />
        <meshStandardMaterial 
          color="#C0C0C0" 
          metalness={0.9} 
          roughness={0.1} 
          envMapIntensity={reducedQuality ? 0.5 : 1}
        />
      </mesh>
      
      {/* Lipstick Top Cap */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.8, segments]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2} 
          envMapIntensity={reducedQuality ? 0.6 : 1.2}
        />
      </mesh>
      
      {/* Lipstick Color (Rose Gold) */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.3, Math.max(8, segments / 2)]} />
        <meshStandardMaterial 
          color="#E91E63" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {!reducedQuality && (
        /* Decorative Ring - only on desktop */
        <mesh position={[0, -0.3, 0]}>
          <torusGeometry args={[0.19, 0.02, 8, segments]} />
          <meshStandardMaterial 
            color="#FFD700" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
      )}
    </group>
  );
};

// Optimized Perfume Bottle - fewer details on mobile
const PerfumeBottle = ({ reducedQuality }: { reducedQuality: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + 1) * 0.15;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.6) * 0.05;
    }
  });

  const segments = reducedQuality ? 6 : 8;

  return (
    <group ref={meshRef} position={[2, 0, 0]}>
      {/* Bottle Body */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.25, 0.15, 0.8, segments]} />
        <meshPhysicalMaterial 
          color="#F8C8DC" 
          transparent={true} 
          opacity={0.8} 
          transmission={reducedQuality ? 0.3 : 0.5}
          thickness={0.1}
        />
      </mesh>
      
      {/* Bottle Cap */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, Math.max(8, segments)]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Perfume Liquid */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.22, 0.13, 0.6, segments]} />
        <meshStandardMaterial 
          color="#FF69B4" 
          transparent={true} 
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

// Compact Mirror - simplified for mobile
const CompactMirror = ({ reducedQuality }: { reducedQuality: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + 2) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  const segments = reducedQuality ? 16 : 32;

  return (
    <group ref={meshRef} position={[-2, 0, 0]}>
      {/* Mirror Base */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, segments]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Mirror Surface */}
      <mesh position={[0, 0.03, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.01, segments]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          metalness={1} 
          roughness={0}
        />
      </mesh>
    </group>
  );
};

const OptimizedBeautyProduct3D: React.FC = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Don't render 3D on very small screens or low-end devices
  if (isMobile && window.innerWidth < 480) {
    return (
      <div ref={containerRef} className="w-full h-full flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center">
            <span className="text-white text-2xl">💄</span>
          </div>
          <p className="text-muted-foreground">Premium Beauty Products</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      {isVisible && (
        <Canvas
          dpr={isMobile ? 1 : [1, 2]}
          performance={{ min: isMobile ? 0.5 : 0.8 }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          
          {/* Simplified lighting for mobile */}
          <ambientLight intensity={isMobile ? 0.6 : 0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={isMobile ? 0.8 : 1} 
            castShadow={!isMobile}
            shadow-mapSize-width={isMobile ? 512 : 2048}
            shadow-mapSize-height={isMobile ? 512 : 2048}
          />
          {!isMobile && (
            <>
              <pointLight position={[-5, 5, 5]} intensity={0.5} color="#FF69B4" />
              <pointLight position={[5, -5, -5]} intensity={0.3} color="#FFD700" />
            </>
          )}
          
          {/* Environment for reflections - disabled on mobile for performance */}
          {!isMobile && <Environment preset="studio" />}
          
          {/* 3D Models with quality settings */}
          <Lipstick reducedQuality={isMobile} />
          <PerfumeBottle reducedQuality={isMobile} />
          <CompactMirror reducedQuality={isMobile} />
          
          {/* Controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={isMobile ? 0.3 : 0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      )}
    </div>
  );
};

export default OptimizedBeautyProduct3D;