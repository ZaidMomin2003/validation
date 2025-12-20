'use client';
import {useEffect, useRef, useState} from 'react';
import createGlobe from 'cobe';
import { useSpring, useMotionValue } from 'framer-motion';

type GlobeProps = {
  width?: number;
  height?: number;
  className?: string;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
  scale?: number;
};
export default function Earth({
  width = 600,
  height = 600,
  className,
  baseColor = [1, 1, 1],
  markerColor = [1, 0, 0],
  glowColor = [0.8, 0.8, 0.8],
  scale = 1,
}: GlobeProps) {
  const r = useMotionValue(0);
  const springR = useSpring(r, {
    mass: 1,
    tension: 280,
    friction: 40,
    precision: 0.001,
  });

  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const fadingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    let doubleTouch = false;
    let initialDistance = 0;
    let currentScale = scale;
    const handleResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    if (canvasRef.current) {
      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 3,
        mapSamples: 36_000,
        mapBrightness: 1.2,
        mapBaseBrightness: 1,
        baseColor: baseColor,
        markerColor: markerColor,
        glowColor: glowColor,
        markers: [],
        scale: currentScale,
        onRender: (state) => {
          state.phi = currentPhi + springR.get();
          state.width = width * 2;
          state.height = width * 2;
          state.scale = currentScale;
        },
      });
    }

    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.pointerId;
      canvasRef.current!.style.cursor = 'grabbing';
      if (fadingTimeout.current) clearTimeout(fadingTimeout.current);
    };

    const onPointerUp = () => {
      pointerInteracting.current = null;
      canvasRef.current!.style.cursor = 'grab';
    };

    const onPointerOut = () => {
      pointerInteracting.current = null;
      canvasRef.current!.style.cursor = 'grab';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current === e.pointerId && !isDragging) {
        const delta = e.clientX - pointerInteractionMovement.current;
        pointerInteractionMovement.current = e.clientX;
        r.set(r.get() + delta / 200);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && globeRef.current) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        if (initialDistance) {
          const scaleChange = (distance - initialDistance) / 200;
          const newScale = Math.min(Math.max(currentScale + scaleChange, 1), 3);
          currentScale = newScale;
        }
        initialDistance = distance;
        doubleTouch = true;
      } else if (e.touches.length === 1 && !doubleTouch) {
        const touch = e.touches[0];
        if (pointerInteractionMovement.current !== null) {
          const delta = touch.clientX - pointerInteractionMovement.current;
          currentPhi += delta / 200;
        }
        pointerInteractionMovement.current = touch.clientX;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        pointerInteractionMovement.current = e.touches[0].clientX;
        setIsDragging(false);
        doubleTouch = false;
      } else if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        setIsDragging(true);
        doubleTouch = true;
      }
    };

    const onTouchEnd = () => {
      initialDistance = 0;
      pointerInteractionMovement.current = 0;
      setIsDragging(false);
      doubleTouch = false;
    };
    if (canvasRef.current) {
      canvasRef.current.addEventListener('pointerdown', onPointerDown);
      canvasRef.current.addEventListener('pointerup', onPointerUp);
      canvasRef.current.addEventListener('pointerout', onPointerOut);
      canvasRef.current.addEventListener('pointermove', onPointerMove);
      canvasRef.current.addEventListener('touchstart', onTouchStart, {
        passive: false,
      });
      canvasRef.current.addEventListener('touchmove', onTouchMove, {
        passive: false,
      });
      canvasRef.current.addEventListener('touchend', onTouchEnd, {
        passive: false,
      });
    }
    return () => {
      globeRef.current?.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div
      className={`absolute inset-0 z-10 mx-auto aspect-[1/1] w-full max-w-[${width}px]`}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-100 transition-opacity duration-300"
        onMouseEnter={() => {
          setIsDragging(true);
        }}
        onMouseLeave={() => {
          setIsDragging(false);
        }}
        onTouchStart={() => {
          setIsDragging(true);
        }}
        onTouchEnd={() => {
          setIsDragging(false);
        }}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          cursor: 'auto',
          userSelect: 'none',
        }}
      />
    </div>
  );
}
