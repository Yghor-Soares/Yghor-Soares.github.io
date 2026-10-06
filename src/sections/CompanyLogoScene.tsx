import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface CompanyLogoSceneProps {
  className?: string;
  label: string;
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      if ('map' in material && material.map instanceof THREE.Texture) material.map.dispose();
      material.dispose();
    });
  });
}

export function CompanyLogoScene({ className, label }: CompanyLogoSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

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
    camera.position.set(0, 0.15, 5.8);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.HemisphereLight(0xd8ebff, 0x174b7b, 2.1));

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x63aaff, 2.4);
    rimLight.position.set(4, 2, -3);
    scene.add(rimLight);

    const spin = new THREE.Group();
    scene.add(spin);

    const leftEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x57d2d8,
      metalness: 0.42,
      roughness: 0.3,
    });
    const rightEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0866b8,
      metalness: 0.42,
      roughness: 0.3,
    });
    const gradientCanvas = document.createElement('canvas');
    gradientCanvas.width = 256;
    gradientCanvas.height = 2;
    const gradientTexture = new THREE.CanvasTexture(gradientCanvas);
    gradientTexture.colorSpace = THREE.SRGBColorSpace;
    const gradientMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: gradientTexture,
      metalness: 0.3,
      roughness: 0.38,
    });
    const logoMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    const geometry = new THREE.BoxGeometry(3.6, 2.35, 0.2);
    const plaque = new THREE.Mesh(geometry, [
      rightEdgeMaterial,
      leftEdgeMaterial,
      gradientMaterial,
      gradientMaterial,
      logoMaterial,
      logoMaterial,
    ]);
    spin.add(plaque);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1, 48),
      new THREE.MeshBasicMaterial({ color: 0x1c78cd, transparent: true, opacity: 0.18, depthWrite: false }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.scale.set(1.25, 0.55, 1);
    shadow.position.set(0, -1.55, 0);
    scene.add(shadow);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      `${import.meta.env.BASE_URL}idiomapopular.png`,
      (logoImage) => {
        const sourceCanvas = document.createElement('canvas');
        sourceCanvas.width = logoImage.image.width;
        sourceCanvas.height = logoImage.image.height;
        const sourceContext = sourceCanvas.getContext('2d');
        const gradientContext = gradientCanvas.getContext('2d');
        const faceCanvas = document.createElement('canvas');
        faceCanvas.width = 720;
        faceCanvas.height = 470;
        const faceContext = faceCanvas.getContext('2d');
        if (!sourceContext || !gradientContext || !faceContext) {
          console.error('Não foi possível preparar as texturas da placa 3D.');
          return;
        }

        sourceContext.drawImage(logoImage.image, 0, 0);
        const middleY = Math.floor(sourceCanvas.height / 2);
        const left = sourceContext.getImageData(0, middleY, 1, 1).data;
        const right = sourceContext.getImageData(sourceCanvas.width - 1, middleY, 1, 1).data;
        const toColor = (color: Uint8ClampedArray) => `rgb(${color[0]} ${color[1]} ${color[2]})`;

        const logoLeft = (faceCanvas.width - faceCanvas.height) / 2;
        const logoRight = logoLeft + faceCanvas.height;
        const fillGradient = faceContext.createLinearGradient(0, 0, faceCanvas.width, 0);
        fillGradient.addColorStop(0, toColor(left));
        fillGradient.addColorStop(logoLeft / faceCanvas.width, toColor(left));
        fillGradient.addColorStop(logoRight / faceCanvas.width, toColor(right));
        fillGradient.addColorStop(1, toColor(right));
        faceContext.fillStyle = fillGradient;
        faceContext.fillRect(0, 0, faceCanvas.width, faceCanvas.height);
        faceContext.drawImage(logoImage.image, logoLeft, 0, faceCanvas.height, faceCanvas.height);

        const sideGradient = gradientContext.createLinearGradient(0, 0, gradientCanvas.width, 0);
        sideGradient.addColorStop(0, toColor(left));
        sideGradient.addColorStop(1, toColor(right));
        gradientContext.fillStyle = sideGradient;
        gradientContext.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);

        const faceTexture = new THREE.CanvasTexture(faceCanvas);
        faceTexture.colorSpace = THREE.SRGBColorSpace;
        faceTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        logoMaterial.map = faceTexture;
        logoMaterial.needsUpdate = true;
        gradientTexture.needsUpdate = true;
        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error('Não foi possível carregar a logo da empresa para a cena 3D.', error);
      },
    );

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
    const animationStart = performance.now();
    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      const animate = () => {
        const elapsedSeconds = (performance.now() - animationStart) / 1000;
        spin.rotation.y = elapsedSeconds * (Math.PI * 2 / 20);
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
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className={className} role="img" aria-label={label} />;
}
