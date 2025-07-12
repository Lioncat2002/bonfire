
import { useRef } from "react";

const slippageOptions = [
  { label: "0.1%", value: 10 },
  { label: "0.5%", value: 50 },
  { label: "1.0%", value: 100 },
];

type SlippageSliderProps = {
  slippage: number;
  onChange: (val: number) => void;
};

export function SlippageSlider({ slippage, onChange }: SlippageSliderProps) {
  // const [slippage, setSlippage] = useState(10); // default: 0.1%
  const sliderRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    onChange(slippageOptions[index].value);
  };

  const selectedIndex = slippageOptions.findIndex(
    (opt) => opt.value === slippage
  );

  return (
    <div className="p-4 w-full max-w-sm">
      <label className="block mb-2 font-semibold text-sm text-gray-700">
        SLIPPAGE: <span className="text-black">{slippage / 100}%</span>
      </label>
      <input
        ref={sliderRef}
        type="range"
        min={0}
        max={slippageOptions.length - 1}
        step={1}
        value={selectedIndex}
        onChange={handleChange}
        className="w-full accent-black transition-all duration-600 ease-in-out"
      />
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        {slippageOptions.map((opt, i) => (
          <span key={i}>{opt.label}</span>
        ))}
      </div>
    </div>
  );
}
