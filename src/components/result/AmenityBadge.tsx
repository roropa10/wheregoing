interface AmenityBadgeProps {
  icon: string
  label: string
  available: boolean
}

export function AmenityBadge({ icon, label, available }: AmenityBadgeProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium
        ${available ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}
      aria-label={`${label}: ${available ? '있음' : '없음'}`}
    >
      <span className="text-lg">{available ? icon : '✕'}</span>
      <span>{label}</span>
    </div>
  )
}
