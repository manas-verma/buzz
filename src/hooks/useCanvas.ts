import { useRef, useEffect } from "react";
import type { Context, Draw } from "types";

const updateCanvasSize = (canvas: HTMLCanvasElement, context: Context) => {
  const { width, height } = canvas.getBoundingClientRect();
  if (canvas.width === width && canvas.height === height) return false;
  const { devicePixelRatio: ratio = 1 } = window;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.scale(ratio, ratio);
  return true;
};

export default function useCanvas(draw: Draw) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const render = () => {
      updateCanvasSize(canvas, context);
      context.clearRect(0, 0, canvas.width, canvas.height);
      draw(context);
      window.requestAnimationFrame(render);
    };
    render();
  }, [draw]);

  return canvasRef;
}
