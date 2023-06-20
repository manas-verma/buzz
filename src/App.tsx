import React, { useEffect, useState } from "react";
import Slider from "components/Slider";
import useWindowSize from "hooks/useWindowSize";
import Canvas from "components/Canvas";
import Swarm from "models/swarm";

const DEFAULT_NUM_BALLS = 5;
const DEFAULT_RADIUS = 10;
const DEFAULT_SPEED = 10;

const DEFAULT_ATTRACTION = 50;
const DEFAULT_REPULSION = 50;
const DEFAULT_DRAG = 50;
const DEFAULT_THRESHOLD = 50;

export default function App() {
  const [numBalls, setNumBalls] = useState(DEFAULT_NUM_BALLS);
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const [attraction, setAttraction] = useState(DEFAULT_ATTRACTION);
  const [repulsion, setRepulsion] = useState(DEFAULT_REPULSION);
  const [drag, setDrag] = useState(DEFAULT_DRAG);
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);

  const [swarm, setSwarm] = useState<Swarm | null>(null);
  const [toggle, setToggle] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setSwarm(
      new Swarm({
        numBalls,
        radius,
        speed,
        attraction,
        repulsion,
        drag,
        threshold,
      })
    );
  }, [numBalls, radius, speed, attraction, repulsion, drag, threshold, toggle]);

  const draw = (context: CanvasRenderingContext2D) => {
    swarm?.draw(context);
    swarm?.update();
  };

  return (
    <div className="h-100">
      <div className="flex w-100">
        <div className="backdrop-blur-md w-min p-2 m-2 bg-violet-300 rounded">
          <p>Total: {numBalls}</p>
          <Slider
            setParentValue={setNumBalls}
            minValue={1}
            maxValue={50}
            defaultValue={DEFAULT_NUM_BALLS}
          />
          <p>Radius: {radius}</p>
          <Slider
            setParentValue={setRadius}
            minValue={1}
            maxValue={30}
            defaultValue={DEFAULT_RADIUS}
          />
          <p>Speed: {speed}</p>
          <Slider
            setParentValue={setSpeed}
            minValue={1}
            maxValue={25}
            defaultValue={DEFAULT_SPEED}
          />
          <p>
            <button onClick={() => setToggle(!toggle)}>RESTART</button>
          </p>
        </div>
        <div className="backdrop-blur-md w-min p-2 m-2 bg-violet-300 rounded">
          <p>Attract: {attraction}</p>
          <Slider
            setParentValue={setAttraction}
            minValue={1}
            maxValue={100}
            defaultValue={DEFAULT_ATTRACTION}
          />
          <p>Repulse: {repulsion}</p>
          <Slider
            setParentValue={setRepulsion}
            minValue={1}
            maxValue={100}
            defaultValue={DEFAULT_REPULSION}
          />
          <p>Drag: {drag}</p>
          <Slider
            setParentValue={setDrag}
            minValue={1}
            maxValue={100}
            defaultValue={DEFAULT_DRAG}
          />
          <p>Threshold: {threshold}</p>
          <Slider
            setParentValue={setThreshold}
            minValue={1}
            maxValue={100}
            defaultValue={DEFAULT_THRESHOLD}
          />
        </div>
      </div>
      <Canvas draw={draw} width={size.width * 0.8} height={size.height * 0.8} />
    </div>
  );
}
