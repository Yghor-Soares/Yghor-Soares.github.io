import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useTheme } from '../theme/useTheme';

interface LaptopSceneProps {
  className?: string;
  label: string;
}

function roundedShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  shape.moveTo(-halfWidth + radius, -halfHeight);
  shape.lineTo(halfWidth - radius, -halfHeight);
  shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + radius);
  shape.lineTo(halfWidth, halfHeight - radius);
  shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - radius, halfHeight);
  shape.lineTo(-halfWidth + radius, halfHeight);
  shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - radius);
  shape.lineTo(-halfWidth, -halfHeight + radius);
  shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + radius, -halfHeight);

  return shape;
}

function createScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  if (!context) return null;

  context.fillStyle = '#10243b';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#193b61';
  context.fillRect(24, 24, 592, 352);
  context.fillStyle = '#f3f8ff';
  context.font = '700 32px sans-serif';
  context.fillText('YS', 52, 78);
  context.fillStyle = '#8dc5ff';
  context.font = '600 15px sans-serif';
  context.fillText('DESENVOLVIMENTO  /  DESIGN', 52, 113);

  context.fillStyle = '#23578b';
  context.beginPath();
  context.roundRect(52, 147, 536, 172, 12);
  context.fill();
  context.fillStyle = '#a7cefa';
  context.fillRect(78, 275, 56, 20);
  context.fillRect(150, 238, 56, 57);
  context.fillRect(222, 208, 56, 87);
  context.fillRect(294, 244, 56, 51);
  context.fillRect(366, 184, 56, 111);
  context.fillRect(438, 222, 56, 73);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      const map = 'map' in material ? material.map : null;
      map?.dispose();
      material.dispose();
    });
  });
}

export function LaptopScene({ className, label }: LaptopSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 2.05, 6.1);
    camera.lookAt(0, 0.85, 0);

    scene.add(new THREE.HemisphereLight(0xd8ebff, 0x263b55, 2.1));

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(-3, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x63aaff, 2.4);
    rimLight.position.set(4, 3, -3);
    scene.add(rimLight);

    const spin = new THREE.Group();
    const model = new THREE.Group();
    spin.add(model);
    scene.add(spin);

    const metal = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x5c84b0 : 0x9db9d9,
      metalness: 0.72,
      roughness: 0.28,
    });
    const edgeMetal = new THREE.MeshStandardMaterial({ color: 0x55789e, metalness: 0.8, roughness: 0.24 });
    const keyMaterial = new THREE.MeshStandardMaterial({ color: 0x1b2f47, metalness: 0.28, roughness: 0.54 });

    const baseGeometry = new THREE.ExtrudeGeometry(roundedShape(3.5, 2.42, 0.14), {
      depth: 0.13,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.035,
      bevelThickness: 0.035,
      curveSegments: 6,
    });
    baseGeometry.rotateX(-Math.PI / 2);
    const base = new THREE.Mesh(baseGeometry, metal);
    base.position.y = -0.025;
    model.add(base);

    const keyboard = new THREE.Group();
    model.add(keyboard);
    const keyGeometry = new THREE.ExtrudeGeometry(roundedShape(0.17, 0.13, 0.025), {
      depth: 0.025,
      bevelEnabled: false,
    });
    keyGeometry.rotateX(-Math.PI / 2);
    for (let row = 0; row < 4; row += 1) {
      for (let column = 0; column < 13; column += 1) {
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(-1.28 + column * 0.21, 0.105, -0.72 + row * 0.19);
        keyboard.add(key);
      }
    }

    const trackpadGeometry = new THREE.BoxGeometry(0.78, 0.018, 0.48);
    const trackpad = new THREE.Mesh(trackpadGeometry, edgeMetal);
    trackpad.position.set(0, 0.11, 0.73);
    model.add(trackpad);

    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 3.1, 24), edgeMetal);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 0.085, -1.1);
    model.add(hinge);

    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 0.11, -1.12);
    lidPivot.rotation.x = -0.12;
    model.add(lidPivot);

    const lidGeometry = new THREE.ExtrudeGeometry(roundedShape(3.48, 2.26, 0.15), {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      curveSegments: 6,
    });
    lidGeometry.translate(0, 1.12, -0.06);
    lidPivot.add(new THREE.Mesh(lidGeometry, metal));

    const screenTexture = createScreenTexture();
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: screenTexture,
      side: THREE.FrontSide,
    });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.12, 1.94), screenMaterial);
    screen.position.set(0, 1.12, 0.064);
    lidPivot.add(screen);

    const logo = new THREE.Mesh(
      new THREE.CircleGeometry(0.055, 24),
      new THREE.MeshStandardMaterial({ color: 0x31577e, metalness: 0.65, roughness: 0.25 }),
    );
    logo.position.set(0, 1.12, -0.125);
    lidPivot.add(logo);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(2.15, 48),
      new THREE.MeshBasicMaterial({ color: 0x193c62, transparent: true, opacity: 0.2, depthWrite: false }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.scale.set(1.25, 0.55, 1);
    shadow.position.y = -0.17;
    model.add(shadow);

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let frame = 0;
    const clock = new THREE.Clock();
    if (reducedMotion) {
      spin.rotation.y = -0.42;
      renderer.render(scene, camera);
    } else {
      const animate = () => {
        const time = clock.getElapsedTime();
        spin.rotation.y = time * 0.38 - 0.42;
        spin.rotation.x = Math.sin(time * 0.55) * 0.035;
        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(animate);
      };
      frame = window.requestAnimationFrame(animate);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      disposeScene(scene);
      renderer.dispose();
    };
  }, [reducedMotion, theme]);

  return <canvas ref={canvasRef} className={className} role="img" aria-label={label} />;
}