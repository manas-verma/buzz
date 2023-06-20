import { toInt } from "radash";
import { useState } from "react";

type Props = {
  setParentValue: (value: number) => void;
  minValue: number;
  maxValue: number;
  defaultValue: number;
};

export default function Slider(props: Props) {
  const { setParentValue, minValue, maxValue, defaultValue } = props;
  const [value, setValue] = useState(defaultValue);
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(value * 100) / maxValue}% 100%`,
    };
  };

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = toInt(e.target.value) ?? 0;
    setValue(value);
    setParentValue(value);
  }

  return (
    <input
      type="range"
      min={minValue}
      max={maxValue}
      onChange={onChange}
      style={getBackgroundSize()}
      value={value}
    />
  );
}
