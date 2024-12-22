import { TemperatureUnit } from "@/weatherForecast/types/models/Weather";
import { FC } from "react";

interface UnitToggleProps {
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
}

export const UnitToggle: FC<UnitToggleProps> = ({ unit, setUnit }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setUnit('C')}
        className={`px-3 py-1 rounded text-black dark:bg-gray-500 ${unit === 'C' ? 'bg-blue-500 text-white ' : 'bg-gray-200'
          }`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit('F')}
        className={`px-3 py-1 rounded text-black dark:bg-gray-500 ${unit === 'F' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
      >
        °F
      </button>
    </div>
  )
}