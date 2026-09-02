import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Minus, Plus, AlertCircle } from 'lucide-react';

interface CircularSelectorProps {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  colorScheme: {
    stroke: string;
    text: string;
    badgeBg: string;
    iconBg: string;
    glow: string;
  };
  icon: React.ReactNode;
  onChange: (value: number) => void;
  helperText?: string;
}

export const CircularSelector: React.FC<CircularSelectorProps> = ({
  label,
  unit,
  value,
  min,
  max,
  step = 1,
  colorScheme,
  icon,
  onChange,
  helperText
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(String(value));
  const [inputError, setInputError] = useState<string | null>(null);

  // Sync typed text when value changes from external source (like presets or drag)
  useEffect(() => {
    setInputValue(String(value));
    setInputError(null);
  }, [value]);

  // SVG Geometry
  const size = 140;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth - 4;
  const circumference = 2 * Math.PI * radius;

  // Clamped percentage (0 to 1)
  const fraction = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const strokeDashoffset = circumference * (1 - fraction);

  // Knob coordinates
  // Start from top (-90 degrees) and rotate clockwise
  const angleRad = fraction * 2 * Math.PI - Math.PI / 2;
  const knobX = center + radius * Math.cos(angleRad);
  const knobY = center + radius * Math.sin(angleRad);

  // Calculate value from pointer event
  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = clientX - cx;
      const dy = clientY - cy;

      // angle in radians from -PI to +PI, 0 is right
      let angle = Math.atan2(dy, dx) + Math.PI / 2; // 0 is top
      if (angle < 0) {
        angle += 2 * Math.PI;
      }

      const p = angle / (2 * Math.PI);
      const rawVal = min + p * (max - min);
      const steppedVal = Math.round(rawVal / step) * step;
      const clampedVal = Math.max(min, Math.min(max, steppedVal));

      onChange(clampedVal);
    },
    [min, max, step, onChange]
  );

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture release fallback
      }
      setIsDragging(false);
    }
  };

  // Step button increments
  const handleStep = (direction: 'up' | 'down') => {
    const delta = direction === 'up' ? step : -step;
    const newVal = Math.max(min, Math.min(max, value + delta));
    onChange(newVal);
  };

  // Manual typing handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);

    if (text.trim() === '') {
      setInputError(`Enter ${min}–${max}`);
      return;
    }

    const parsed = Number(text);
    if (isNaN(parsed)) {
      setInputError('Numbers only');
      return;
    }

    if (parsed < min || parsed > max) {
      setInputError(`Range: ${min}–${max}`);
      return;
    }

    setInputError(null);
    onChange(Math.round(parsed));
  };

  const handleInputBlur = () => {
    const parsed = Number(inputValue);
    if (isNaN(parsed) || parsed < min || parsed > max || inputValue.trim() === '') {
      // Revert to current valid value on blur
      setInputValue(String(value));
      setInputError(null);
    }
  };

  return (
    <div className="bg-white/90 border border-white rounded-[28px] p-5 shadow-clay-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center text-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full ${colorScheme.iconBg} text-white flex items-center justify-center shadow-clay-orb shrink-0`}
          >
            {icon}
          </div>
          <span
            style={{ fontFamily: 'Nunito, sans-serif' }}
            className="text-sm font-extrabold text-[#332F3A] text-left"
          >
            {label}
          </span>
        </div>

        <span className="text-[10px] font-mono font-bold text-[#635F69] bg-[#EFEBF5] px-2 py-0.5 rounded-full">
          {min}–{max}
        </span>
      </div>

      {/* Interactive Radial Dial */}
      <div className="relative my-2 flex items-center justify-center select-none touch-none">
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="cursor-pointer"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Background Track Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E9E4F2"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="transition-colors duration-200"
          />

          {/* Active Radial Progress Arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colorScheme.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            transform={`rotate(-90 ${center} ${center})`}
            style={{
              transition: isDragging ? 'none' : 'stroke-dashoffset 0.25s ease-out, stroke 0.3s ease'
            }}
          />

          {/* Tactile Knob Dot */}
          <circle
            cx={knobX}
            cy={knobY}
            r={strokeWidth * 0.75}
            fill="#ffffff"
            stroke={colorScheme.stroke}
            strokeWidth={3}
            className="filter drop-shadow-md"
            style={{
              transition: isDragging ? 'none' : 'cx 0.25s ease-out, cy 0.25s ease-out'
            }}
          />
        </svg>

        {/* Center Display: Value + Unit */}
        <div className="absolute flex flex-col items-center pointer-events-none">
          <span
            style={{ fontFamily: 'Nunito, sans-serif' }}
            className={`text-2xl font-black ${colorScheme.text} tracking-tight leading-none`}
          >
            {value}
          </span>
          <span
            style={{ fontFamily: 'Nunito, sans-serif' }}
            className="text-[11px] font-extrabold uppercase text-[#635F69] tracking-wider mt-0.5"
          >
            {unit}
          </span>
        </div>
      </div>

      {/* Stepper Buttons & Typing Input Section */}
      <div className="w-full space-y-2 mt-1">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleStep('down')}
            disabled={value <= min}
            aria-label={`Decrease ${label}`}
            className="w-8 h-8 rounded-full bg-white border border-[#E9E4F2] shadow-clay-button-secondary text-[#332F3A] flex items-center justify-center hover:-translate-y-0.5 active:scale-90 active:shadow-clay-pressed transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Compact Typing Input Box */}
          <div className="relative flex-1 max-w-[110px]">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder={`${min}–${max}`}
              className={`w-full py-1.5 px-2.5 text-center text-xs font-mono font-bold rounded-2xl outline-none transition-all duration-200 ${
                inputError
                  ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#F87171] ring-2 ring-[#EF4444]/20'
                  : 'bg-[#EFEBF5] text-[#332F3A] shadow-clay-pressed focus:bg-white focus:ring-3 focus:ring-[#7C3AED]/20 border border-transparent'
              }`}
            />
          </div>

          <button
            type="button"
            onClick={() => handleStep('up')}
            disabled={value >= max}
            aria-label={`Increase ${label}`}
            className="w-8 h-8 rounded-full bg-white border border-[#E9E4F2] shadow-clay-button-secondary text-[#332F3A] flex items-center justify-center hover:-translate-y-0.5 active:scale-90 active:shadow-clay-pressed transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Inline Validation Alert or Range Helper */}
        <div className="h-4 flex items-center justify-center">
          {inputError ? (
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#DC2626]">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{inputError}</span>
            </div>
          ) : (
            <span className="text-[10px] text-[#635F69] font-medium truncate">
              {helperText || `Drag dial or type (${min}–${max})`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
