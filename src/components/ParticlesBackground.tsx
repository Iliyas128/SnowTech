import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
};

const BASE_DENSITY_DESKTOP = 14000;
const BASE_DENSITY_MOBILE = 22000;
const LINK_DISTANCE_DESKTOP = 140;
const LINK_DISTANCE_MOBILE = 110;
// Tolerate small viewport-height changes (mobile browser URL-bar show/hide).
const HEIGHT_CHANGE_THRESHOLD = 160;

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const isCoarsePointer =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches;
    const isNarrow = window.innerWidth < 768;
    const isMobile = isCoarsePointer || isNarrow;

    const baseDensity = isMobile ? BASE_DENSITY_MOBILE : BASE_DENSITY_DESKTOP;
    const linkDistance = isMobile ? LINK_DISTANCE_MOBILE : LINK_DISTANCE_DESKTOP;
    const maxParticles = isMobile ? 90 : 160;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    let initialized = false;

    const particles: Particle[] = [];

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const applyCanvasSize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedParticles = () => {
      const targetCount = Math.min(
        maxParticles,
        Math.max(isMobile ? 30 : 40, Math.round((width * height) / baseDensity)),
      );

      particles.length = 0;
      for (let i = 0; i < targetCount; i += 1) {
        particles.push({
          x: random(0, width),
          y: random(0, height),
          vx: random(-0.22, 0.22),
          vy: random(-0.22, 0.22),
          radius: random(0.8, 2.2),
          baseAlpha: random(0.45, 0.9),
        });
      }
    };

    // Rescale existing particles to new dimensions without re-randomizing
    // so mobile URL-bar toggles don't make particles "jump".
    const rescaleParticles = (prevWidth: number, prevHeight: number) => {
      if (prevWidth <= 0 || prevHeight <= 0) {
        seedParticles();
        return;
      }
      const sx = width / prevWidth;
      const sy = height / prevHeight;
      for (let i = 0; i < particles.length; i += 1) {
        particles[i].x *= sx;
        particles[i].y *= sy;
      }
    };

    const init = () => {
      const prevWidth = width;
      const prevHeight = height;
      applyCanvasSize();

      if (!initialized) {
        seedParticles();
        initialized = true;
      } else {
        rescaleParticles(prevWidth, prevHeight);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < linkDistance) {
            const alpha = (1 - distance / linkDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      frameId = window.requestAnimationFrame(draw);
    };

    // Debounced + mobile-aware resize. On mobile we ignore small height-only
    // changes caused by the browser URL bar collapsing/expanding on scroll.
    let resizeTimer = 0;
    let lastWidth = 0;
    let lastHeight = 0;

    const handleLayoutChange = () => {
      const newWidth = canvas.clientWidth;
      const newHeight = canvas.clientHeight;

      const widthChanged = newWidth !== lastWidth;
      const heightDelta = Math.abs(newHeight - lastHeight);
      const significantHeightChange = heightDelta > HEIGHT_CHANGE_THRESHOLD;

      if (!widthChanged && isMobile && !significantHeightChange) {
        return;
      }

      lastWidth = newWidth;
      lastHeight = newHeight;
      init();
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(handleLayoutChange, 120);
    };

    // Defer first init to the next frame so that mobile layout (safe areas,
    // 100vh, font loading) has settled; avoids the "wrong scale for ~3s" bug.
    const startFrame = window.requestAnimationFrame(() => {
      init();
      lastWidth = canvas.clientWidth;
      lastHeight = canvas.clientHeight;
      draw();
    });

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(canvas);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(startFrame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="global-particles" aria-hidden="true" />;
};

export default ParticlesBackground;
