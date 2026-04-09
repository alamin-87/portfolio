import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Text,
  PerspectiveCamera,
  Stars,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";

// 1. STARFIELD (HERO) - Enhanced visibility
function StarField({ activeOpacity }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={120}
        depth={60}
        count={6000}
        factor={6}
        saturation={0}
        fade
        speed={0.3}
      />
      <ambientLight intensity={activeOpacity * 1.5} />
      
      {/* Floating Holographic Code Panels for Hero */}
      <group>
        {[...Array(4)].map((_, i) => (
          <Float key={i} speed={0.8} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[(i - 1.5) * 12, (i % 2) * 5 - 2, -12]}>
              <planeGeometry args={[8, 5]} />
              <meshBasicMaterial 
                color="#06b6d4" 
                transparent 
                opacity={activeOpacity * 0.1} 
                side={THREE.DoubleSide} 
                wireframe
              />
            </mesh>
          </Float>
        ))}
      </group>
    </group>
  );
}

// 2. CODE FIELD (ABOUT) - Massive symbol cloud with continuous motion
function CodeField({ activeOpacity }) {
  const symbols = [
    "⚛️", "💻", "⌨️", "🖱️", "🗄️", "⚡", "🔒", "🛠️", "📡", "💾", "🚀", "⚙️", "MERN", "SQL", "PostgreSQL", "MongoDB", "Express",
    "{ }", "</>", "=>", "[]", "( )", "const", "async", "await", "import", "export", 
    "git", "npm", "JSON", "React", "Node", "map", "filter", "API", "fetch", "class", 
    "style", "props", "children", "true", "false", "null", "undefined", "Next.js",
    "Tailwind", "Docker", "AWS", "Redux", "GSAP", "Vite", "TS", "JS",
    "Python", "??", "?.", "...", "&&", "||", "===", "useState", "useEffect", "map()",
    "filter()", "reduce()", "axios", "pnpm", "yarn", "JWT", "OAuth", "SEO", "terminal"
  ];
  const count = 120;

  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40,
      ],
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      speed: 0.01 + Math.random() * 0.02,
      rotSpeed: Math.random() * 0.005,
      color: i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#06b6d4" : "#8b5cf6"
    }));
  }, []);

  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.children.forEach((child, i) => {
            child.position.y -= items[i].speed;
            if (child.position.y < -40) child.position.y = 40;
            child.rotation.x += items[i].rotSpeed;
            child.rotation.z += items[i].rotSpeed;
        });
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
          <Text
            key={i}
            position={item.pos}
            fontSize={0.8}
            color={item.color}
            fillOpacity={activeOpacity * 0.7}
            anchorX="center"
            anchorY="middle"
          >
            {item.symbol}
          </Text>
      ))}
    </group>
  );
}

// 3. PROJECT CLOUD (PROJECTS) - Interactive feel
function ProjectCloud({ activeOpacity }) {
  return null; // Removing the grid/row-col animation as requested
}

// 4. NEURAL NETWORK (SKILLS)
function NeuralNetwork({ activeOpacity }) {
  const count = 60;
  const meshRef = useRef();
  const lineMeshRef = useRef();

  const [particles, vels] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 45;
      p[i * 3 + 1] = (Math.random() - 0.5) * 45;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
      v[i * 3] = (Math.random() - 0.5) * 0.01;
      v[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [p, v];
  }, []);

  const lines = useMemo(() => new Float32Array(count * count * 6), []);

  useFrame(() => {
    if (!meshRef.current || !lineMeshRef.current || activeOpacity <= 0) return;
    const p = meshRef.current.geometry.attributes.position.array;
    let lineIdx = 0;

    for (let i = 0; i < count; i++) {
      p[i * 3] += vels[i * 3];
      p[i * 3 + 1] += vels[i * 3 + 1];
      p[i * 3 + 2] += vels[i * 3 + 2];
      if (Math.abs(p[i * 3]) > 22) vels[i * 3] *= -1;
      if (Math.abs(p[i * 3 + 1]) > 22) vels[i * 3 + 1] *= -1;
      if (Math.abs(p[i * 3 + 2]) > 6) vels[i * 3 + 2] *= -1;

      for (let j = i + 1; j < count; j++) {
        const distSq =
          (p[i * 3] - p[j * 3]) ** 2 +
          (p[i * 3 + 1] - p[j * 3 + 1]) ** 2 +
          (p[i * 3 + 2] - p[j * 3 + 2]) ** 2;
        if (distSq < 144) {
          lines[lineIdx++] = p[i * 3];
          lines[lineIdx++] = p[i * 3 + 1];
          lines[lineIdx++] = p[i * 3 + 2];
          lines[lineIdx++] = p[j * 3];
          lines[lineIdx++] = p[j * 3 + 1];
          lines[lineIdx++] = p[j * 3 + 2];
        }
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    lineMeshRef.current.geometry.attributes.position.needsUpdate = true;
    lineMeshRef.current.geometry.setDrawRange(0, lineIdx / 3);
  });

  return (
    <group>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color="#8b5cf6"
          transparent
          opacity={activeOpacity}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={lineMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count * count * 2}
            array={lines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={activeOpacity * 0.45}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function ParticleField() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const den = document.documentElement.scrollHeight - window.innerHeight;
      const progress = den > 0 ? window.scrollY / den : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const getOpacity = (start, end) => {
    const fade = 0.25;
    if (scrollProgress < start - fade || scrollProgress > end + fade) return 0;
    if (scrollProgress >= start && scrollProgress <= end) return 1;
    if (scrollProgress < start) return (scrollProgress - (start - fade)) / fade;
    return (fade - (scrollProgress - end)) / fade;
  };

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#0a0a0f" }}
    >
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        <ambientLight intensity={0.5} />

        {/* Dynamic section-based 3D animations with heavy overlap */}
        <StarField activeOpacity={getOpacity(0, 0.35)} />
        <CodeField activeOpacity={getOpacity(0.1, 0.55)} />
        <ProjectCloud activeOpacity={getOpacity(0.3, 0.75)} />
        <NeuralNetwork activeOpacity={getOpacity(0.55, 1.0)} />
      </Canvas>

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(10, 10, 15, 0.7) 100%)",
        }}
      />
    </div>
  );
}
