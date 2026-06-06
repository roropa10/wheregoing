interface ChipGroupProps {
  options: { label: string; value: string }[]
  selected: string | string[]
  multi?: boolean
  onSelect: (value: string) => void
}

export function ChipGroup({ options, selected, multi = false, onSelect }: ChipGroupProps) {
  const isSelected = (v: string) =>
    multi ? (selected as string[]).includes(v) : selected === v

  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={isSelected(opt.value)}
          onClick={() => onSelect(opt.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer
            ${isSelected(opt.value)
              ? 'bg-[#378ADD] text-white border-[#378ADD] shadow-sm'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#378ADD] hover:text-[#378ADD]'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
