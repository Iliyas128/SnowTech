import { useEffect, useRef, useState } from 'react';
import { sceneCache } from '@/lib/sceneCache';

const LOADING_TIMEOUT = 2500;

export const useSceneDimensions = (isMobile: boolean) => {
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    const update = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight - 80;
      const aspectRatio = 1440 / 900;

      let width = isMobile ? containerWidth * 1.55 : containerWidth;
      let height = width / aspectRatio;

      if (height > containerHeight) {
        height = containerHeight;
        width = height * aspectRatio;
      }

      setDimensions({ width, height });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [isMobile]);

  return dimensions;
};

export const useSceneLoading = (projectId: string) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(() => !sceneCache.has(projectId));

  useEffect(() => {
    if (sceneCache.has(projectId)) {
      setIsLoading(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    const finish = () => {
      if (disposed) return;
      disposed = true;
      sceneCache.add(projectId);
      setIsLoading(false);
    };

    const attachLoadHandler = (iframe: HTMLIFrameElement) => {
      if (iframe.dataset.sceneLoadAttached) return;
      iframe.dataset.sceneLoadAttached = 'true';
      iframe.addEventListener('load', finish, { once: true });
    };

    const tryDetect = () => {
      const iframe = container.querySelector('iframe');
      if (iframe) {
        attachLoadHandler(iframe);
        return true;
      }
      const canvas = container.querySelector('canvas');
      if (canvas && canvas.width > 0 && canvas.height > 0) {
        finish();
        return true;
      }
      return false;
    };

    const detected = tryDetect();
    const fallback = window.setTimeout(finish, LOADING_TIMEOUT);

    if (detected) {
      return () => {
        disposed = true;
        window.clearTimeout(fallback);
      };
    }

    const observer = new MutationObserver(() => {
      if (tryDetect()) observer.disconnect();
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      disposed = true;
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [projectId]);

  return { containerRef, isLoading };
};
