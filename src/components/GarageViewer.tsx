import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, Settings, Share2, Heart } from 'lucide-react';

interface BikeData {
  name: string;
  type: string;
  power: string;
  price: string;
  horsepower: string;
  torque: string;
  topSpeed: string;
  zeroToSixty: string;
  description: string;
  image: string;
  features: string[];
  badge: string;
  availability: string;
}

interface GarageViewerProps {
  bike: BikeData;
  bikes: BikeData[];
  onClose: () => void;
  onBikeChange: (bike: BikeData) => void;
}

const GarageViewer: React.FC<GarageViewerProps> = ({ bike, bikes, onClose, onBikeChange }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const bikeModelRef = useRef<THREE.Group>();
  const platformRef = useRef<THREE.Group>();
  const animationIdRef = useRef<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentBikeIndex, setCurrentBikeIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 100);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Garage environment
    createGarageEnvironment(scene);
    
    // Lighting setup
    setupLighting(scene);
    
    // Create bike platform
    createBikePlatform(scene);
    
    // Load bike model
    loadBikeModel(scene, bike);

    setIsLoading(false);
  }, [bike]);

  // Create garage environment
  const createGarageEnvironment = (scene: THREE.Scene) => {
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Garage walls with neon strips
    createGarageWalls(scene);
    
    // LED panels
    createLEDPanels(scene);
    
    // Atmospheric particles
    createAtmosphericEffects(scene);
  };

  // Create garage walls
  const createGarageWalls = (scene: THREE.Scene) => {
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.3,
      roughness: 0.7
    });

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(50, 20);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 10, -25);
    scene.add(backWall);

    // Side walls
    const sideWallGeometry = new THREE.PlaneGeometry(50, 20);
    const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    leftWall.position.set(-25, 10, 0);
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    rightWall.position.set(25, 10, 0);
    rightWall.rotation.y = -Math.PI / 2;
    scene.add(rightWall);

    // Neon strips
    createNeonStrips(scene);
  };

  // Create neon lighting strips
  const createNeonStrips = (scene: THREE.Scene) => {
    const neonMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });

    // Horizontal neon strips
    for (let i = 0; i < 5; i++) {
      const stripGeometry = new THREE.BoxGeometry(40, 0.2, 0.5);
      const strip = new THREE.Mesh(stripGeometry, neonMaterial);
      strip.position.set(0, 5 + i * 3, -24.5);
      scene.add(strip);

      // Add glow effect
      const glowGeometry = new THREE.BoxGeometry(40, 1, 1);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.2
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(strip.position);
      scene.add(glow);
    }
  };

  // Create LED panels
  const createLEDPanels = (scene: THREE.Scene) => {
    const panelGeometry = new THREE.PlaneGeometry(8, 4);
    const panelMaterial = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.6
    });

    // Create multiple LED panels
    for (let i = 0; i < 6; i++) {
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      const angle = (i / 6) * Math.PI * 2;
      panel.position.set(
        Math.cos(angle) * 20,
        8 + Math.sin(i * 0.5) * 2,
        Math.sin(angle) * 20
      );
      panel.lookAt(0, 5, 0);
      scene.add(panel);

      // Animate panel opacity
      gsap.to(panel.material, {
        opacity: 0.2,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  };

  // Create atmospheric effects
  const createAtmosphericEffects = (scene: THREE.Scene) => {
    // Volumetric fog particles
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = Math.random() * 20;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x444444,
      size: 0.1,
      transparent: true,
      opacity: 0.3
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Animate particles
    gsap.to(particleSystem.rotation, {
      y: Math.PI * 2,
      duration: 60,
      repeat: -1,
      ease: "none"
    });
  };

  // Setup lighting
  const setupLighting = (scene: THREE.Scene) => {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Main spotlight
    const mainLight = new THREE.SpotLight(0xffffff, 2);
    mainLight.position.set(0, 20, 10);
    mainLight.target.position.set(0, 0, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);
    scene.add(mainLight.target);

    // Rim lighting
    const rimLight1 = new THREE.DirectionalLight(0x00ffff, 0.5);
    rimLight1.position.set(-10, 5, -10);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xff0066, 0.5);
    rimLight2.position.set(10, 5, -10);
    scene.add(rimLight2);

    // Fill lights
    const fillLight1 = new THREE.PointLight(0xffffff, 0.3, 30);
    fillLight1.position.set(-15, 8, 5);
    scene.add(fillLight1);

    const fillLight2 = new THREE.PointLight(0xffffff, 0.3, 30);
    fillLight2.position.set(15, 8, 5);
    scene.add(fillLight2);
  };

  // Create bike platform
  const createBikePlatform = (scene: THREE.Scene) => {
    const platformGroup = new THREE.Group();
    
    // Main platform
    const platformGeometry = new THREE.CylinderGeometry(4, 4, 0.3, 32);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.8,
      roughness: 0.2
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.castShadow = true;
    platform.receiveShadow = true;
    platformGroup.add(platform);

    // Platform rim with neon
    const rimGeometry = new THREE.TorusGeometry(4, 0.1, 8, 32);
    const rimMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.position.y = 0.2;
    platformGroup.add(rim);

    // Animated rotation
    gsap.to(platformGroup.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    scene.add(platformGroup);
    platformRef.current = platformGroup;
  };

  // Load bike model (simplified 3D representation)
  const loadBikeModel = (scene: THREE.Scene, bikeData: BikeData) => {
    const bikeGroup = new THREE.Group();

    // Create simplified bike geometry
    createBikeGeometry(bikeGroup, bikeData);

    bikeGroup.position.y = 0.5;
    bikeGroup.scale.set(0.8, 0.8, 0.8);

    if (platformRef.current) {
      platformRef.current.add(bikeGroup);
    }

    bikeModelRef.current = bikeGroup;

    // Entrance animation
    gsap.fromTo(bikeGroup.scale, 
      { x: 0, y: 0, z: 0 },
      { x: 0.8, y: 0.8, z: 0.8, duration: 1.5, ease: "back.out(1.7)" }
    );
  };

  // Create simplified bike geometry
  const createBikeGeometry = (group: THREE.Group, bikeData: BikeData) => {
    // Bike body
    const bodyGeometry = new THREE.BoxGeometry(3, 0.8, 0.6);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: getBikeColor(bikeData.name),
      metalness: 0.9,
      roughness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 1, 0);
    body.castShadow = true;
    group.add(body);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.3, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.8,
      roughness: 0.3
    });

    const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontWheel.position.set(1.2, 0.6, 0);
    frontWheel.rotation.z = Math.PI / 2;
    frontWheel.castShadow = true;
    group.add(frontWheel);

    const rearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rearWheel.position.set(-1.2, 0.6, 0);
    rearWheel.rotation.z = Math.PI / 2;
    rearWheel.castShadow = true;
    group.add(rearWheel);

    // Handlebars
    const handlebarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2);
    const handlebarMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: 0.9,
      roughness: 0.1
    });
    const handlebar = new THREE.Mesh(handlebarGeometry, handlebarMaterial);
    handlebar.position.set(1.3, 1.8, 0);
    handlebar.rotation.z = Math.PI / 2;
    handlebar.castShadow = true;
    group.add(handlebar);

    // Exhaust pipes
    const exhaustGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5);
    const exhaustMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.8,
      roughness: 0.2
    });
    const exhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    exhaust.position.set(-1.5, 0.8, 0.4);
    exhaust.rotation.z = Math.PI / 2;
    exhaust.castShadow = true;
    group.add(exhaust);
  };

  // Get bike color based on name
  const getBikeColor = (name: string): number => {
    const colors: { [key: string]: number } = {
      'Harley': 0xff4400,
      'Yamaha': 0x0066ff,
      'BMW': 0x00aa44,
      'Ducati': 0xff0000,
      'Honda': 0xffaa00,
      'Kawasaki': 0x00ff66
    };

    for (const [key, color] of Object.entries(colors)) {
      if (name.includes(key)) return color;
    }
    return 0x666666;
  };

  // Animation loop
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    // Camera orbit animation
    const time = Date.now() * 0.0005;
    cameraRef.current.position.x = Math.cos(time) * 15;
    cameraRef.current.position.z = Math.sin(time) * 15;
    cameraRef.current.lookAt(0, 2, 0);

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle bike change
  const handleBikeChange = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const currentIndex = bikes.findIndex(b => b.name === bike.name);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % bikes.length;
    } else {
      newIndex = currentIndex === 0 ? bikes.length - 1 : currentIndex - 1;
    }

    const newBike = bikes[newIndex];

    // Transition animation
    if (bikeModelRef.current) {
      gsap.to(bikeModelRef.current.position, {
        x: direction === 'next' ? -10 : 10,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          // Remove old bike and load new one
          if (bikeModelRef.current && platformRef.current) {
            platformRef.current.remove(bikeModelRef.current);
          }
          
          loadBikeModel(sceneRef.current!, newBike);
          onBikeChange(newBike);
          setCurrentBikeIndex(newIndex);
          
          setTimeout(() => {
            setIsTransitioning(false);
          }, 1000);
        }
      });
    }
  };

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, []);

  // Initialize scene on mount
  useEffect(() => {
    initScene();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [initScene, animate, handleResize]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* 3D Scene Container */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading Garage...</p>
          </div>
        </div>
      )}

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 pointer-events-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10 border border-white/20"
              >
                <X className="w-6 h-6" />
              </Button>
              <h1 className="text-2xl font-bold text-white">Garage Viewer</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 border border-white/20"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 border border-white/20"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 border border-white/20"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleBikeChange('prev')}
            disabled={isTransitioning}
            className="w-16 h-16 rounded-full bg-black/50 border-2 border-amber text-amber hover:bg-amber hover:text-black transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        </div>

        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleBikeChange('next')}
            disabled={isTransitioning}
            className="w-16 h-16 rounded-full bg-black/50 border-2 border-amber text-amber hover:bg-amber hover:text-black transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>

        {/* Bike Information Panel */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/60 backdrop-blur-lg border border-amber/30 rounded-2xl p-6 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{bike.name}</h2>
                      <p className="text-amber text-lg">{bike.type} • {bike.power}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-amber">{bike.price}</div>
                      <Badge variant="secondary" className="bg-amber/20 text-amber border-amber/30">
                        {bike.badge}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{bike.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {bike.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-amber/30 text-amber hover:bg-amber/10"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Right Column - Specifications */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Performance Specs</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-gray-400 text-sm">Power</div>
                      <div className="text-white font-semibold">{bike.horsepower}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-gray-400 text-sm">Torque</div>
                      <div className="text-white font-semibold">{bike.torque}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-gray-400 text-sm">Top Speed</div>
                      <div className="text-white font-semibold">{bike.topSpeed}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-gray-400 text-sm">0-60 mph</div>
                      <div className="text-white font-semibold">{bike.zeroToSixty}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-accent text-obsidian hover:shadow-glow">
                      Configure
                    </Button>
                    <Button variant="outline" className="flex-1 border-amber text-amber hover:bg-amber hover:text-black">
                      Test Ride
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bike Counter */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-32 pointer-events-auto">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-amber/30">
            <span className="text-amber font-semibold">
              {bikes.findIndex(b => b.name === bike.name) + 1} / {bikes.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageViewer;