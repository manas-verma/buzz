import React from "react";
import useCanvas from "hooks/useCanvas";
import type { Draw } from "types";

type Props = {
  draw: Draw;
  width: number;
  height: number;
};

export default function Canvas(props: Props) {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} />;
}
