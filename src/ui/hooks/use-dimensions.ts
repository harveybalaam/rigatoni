import { useCallback, useState } from "react";

interface IDimensions {
  height?: number;
  width?: number;
}

export function useDimensions() {
  const [dimensions, setDimensions] = useState<IDimensions>({});

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setDimensions({
        height: entry.contentRect.height,
        width: entry.contentRect.width,
      });
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, dimensions };
}
