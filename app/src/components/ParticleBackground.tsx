import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const Particles = ({ count = 100, mousePosition }: ParticlesProps) => {
  const mesh = useRef<THREE.Points>(null);
  const linesMesh = useRef<THREE.LineSegments>(null);

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    
    return [positions, velocities];
  }, [count]);

  const linePositions = useMemo(() => {
    return new Float32Array(count * count * 6);
  }, [count]);

  // Create buffer geometries
  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [positions]);

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geometry;
  }, [linePositions]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const positionArray = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Update positions
      positionArray[i * 3] += velocities[i * 3];
      positionArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionArray[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Mouse interaction
      const dx = mousePosition.current.x * 10 - positionArray[i * 3];
      const dy = -mousePosition.current.y * 10 - positionArray[i * 3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        positionArray[i * 3] -= dx * 0.02;
        positionArray[i * 3 + 1] -= dy * 0.02;
      }
      
      // Boundary check
      if (Math.abs(positionArray[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(positionArray[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positionArray[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;

    // Update connections
    if (linesMesh.current) {
      let lineIndex = 0;
      const lineArray = linesMesh.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = positionArray[i * 3] - positionArray[j * 3];
          const dy = positionArray[i * 3 + 1] - positionArray[j * 3 + 1];
          const dz = positionArray[i * 3 + 2] - positionArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < 2 && lineIndex < count * 6) {
            lineArray[lineIndex++] = positionArray[i * 3];
            lineArray[lineIndex++] = positionArray[i * 3 + 1];
            lineArray[lineIndex++] = positionArray[i * 3 + 2];
            lineArray[lineIndex++] = positionArray[j * 3];
            lineArray[lineIndex++] = positionArray[j * 3 + 1];
            lineArray[lineIndex++] = positionArray[j * 3 + 2];
          }
        }
      }
      
      // Clear remaining lines
      for (let i = lineIndex; i < count * count * 6; i++) {
        lineArray[i] = 0;
      }
      
      linesMesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={mesh} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.05}
          color="#ff73c3"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      <lineSegments ref={linesMesh} geometry={linesGeometry}>
        <lineBasicMaterial color="#ff73c3" transparent opacity={0.1} />
      </lineSegments>
    </>
  );
};

const FloatingShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[5, 0, -5]}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshStandardMaterial
        color="#ff73c3"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const ParticleBackground = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#ff73c3" intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
        <Particles count={80} mousePosition={mousePosition} />
        <FloatingShape />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
