interface StepperProps {
  label: string
  value: number
  min?: number
  max?: number
  onChange: (n: number) => void
}

export function Stepper({ label, value, min = 0, max = 10, onChange }: StepperProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-700 font-medium">{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={`${label} 줄이기`}
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold text-gray-600 disabled:opacity-30 hover:border-[#378ADD] hover:text-[#378ADD] transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center text-lg font-semibold text-gray-800" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          aria-label={`${label} 늘리기`}
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold text-gray-600 disabled:opacity-30 hover:border-[#378ADD] hover:text-[#378ADD] transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}
