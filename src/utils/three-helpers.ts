import * as THREE from 'three';

export class ThreeHelpers {
  // Create a realistic material with PBR properties
  static createPBRMaterial(options: {
    color?: number;
    metalness?: number;
    roughness?: number;
    normalMap?: THREE.Texture;
    envMap?: THREE.Texture;
  }) {
    return new THREE.MeshStandardMaterial({
      color: options.color ?? 0xffffff,
      metalness: options.metalness ?? 0.5,
      roughness: options.roughness ?? 0.5,
      normalMap: options.normalMap,
      envMap: options.envMap,
      envMapIntensity: 1
    });
  }

  // Create volumetric lighting effect
  static createVolumetricLight(
    color: number = 0xffffff,
    intensity: number = 1,
    distance: number = 100,
    decay: number = 2
  ) {
    const light = new THREE.PointLight(color, intensity, distance, decay);
    
    // Add volumetric effect geometry
    const geometry = new THREE.SphereGeometry(0.1, 8, 8);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8
    });
    const sphere = new THREE.Mesh(geometry, material);
    light.add(sphere);

    return light;
  }

  // Create particle system
  static createParticleSystem(
    count: number = 1000,
    color: number = 0xffffff,
    size: number = 0.1
  ) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorObj = new THREE.Color(color);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = Math.random() * 50;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      colors[i] = colorObj.r;
      colors[i + 1] = colorObj.g;
      colors[i + 2] = colorObj.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: size,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    return new THREE.Points(geometry, material);
  }

  // Create neon tube effect
  static createNeonTube(
    path: THREE.Curve<THREE.Vector3>,
    color: number = 0x00ffff,
    radius: number = 0.1
  ) {
    const geometry = new THREE.TubeGeometry(path, 64, radius, 8, false);
    
    // Inner glow material
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1
    });

    // Outer glow material
    const outerMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });

    const innerTube = new THREE.Mesh(geometry, innerMaterial);
    const outerGeometry = new THREE.TubeGeometry(path, 64, radius * 2, 8, false);
    const outerTube = new THREE.Mesh(outerGeometry, outerMaterial);

    const group = new THREE.Group();
    group.add(innerTube);
    group.add(outerTube);

    return group;
  }

  // Create reflective floor
  static createReflectiveFloor(
    size: number = 100,
    reflectivity: number = 0.8
  ) {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: reflectivity
    });

    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;

    return floor;
  }

  // Create animated LED panel
  static createLEDPanel(
    width: number = 8,
    height: number = 4,
    color: number = 0x0066ff
  ) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });

    const panel = new THREE.Mesh(geometry, material);

    // Add animated glow effect
    const glowGeometry = new THREE.PlaneGeometry(width * 1.2, height * 1.2);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    panel.add(glow);

    return panel;
  }

  // Create holographic effect
  static createHologram(
    geometry: THREE.BufferGeometry,
    color: number = 0x00ffff
  ) {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
          float alpha = 1.0 - fresnel;
          alpha *= sin(vPosition.y * 10.0 + time * 2.0) * 0.5 + 0.5;
          
          gl_FragColor = vec4(color, alpha * 0.8);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    return new THREE.Mesh(geometry, material);
  }

  // Dispose of Three.js objects properly
  static dispose(object: THREE.Object3D) {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
    });
  }
}

export default ThreeHelpers;