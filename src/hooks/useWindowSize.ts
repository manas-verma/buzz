import { useState, useEffect } from "react";

type Size = {
  width: number;
  height: number;
};

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 100,
    height: 100,
  });
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
