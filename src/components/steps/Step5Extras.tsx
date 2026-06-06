import { useState } from 'react'
import { useOuting } from '../../hooks/useOuting'

const EXTRA_OPTIONS = [
  { label: '👶 유모차 진입 가능', value: '유모차 진입 가능' },
  { label: '🤱 수유실 있음', value: '수유실 있음' },
  { label: '🧷 기저귀 교환대', value: '기저귀 교환대' },
  { label: '🅿️ 주차 필수', value: '주차 필수' },
  { label: '🍱 점심 포함 코스', value: '점심 포함 코스' },
  { label: '🎟 무료 입장', value: '무료 입장' },
  { label: '🐕 반려동물 동반', value: '반려동물 동반' },
  { label: '📸 사진 명소', value: '사진 명소' },
  { label: '🌂 우천시 가능', value: '우천시 가능' },
  { label: '🛝 아이 놀이터', value: '아이 놀이터' },
  { label: '☕ 카페 병설', value: '카페 병설' },
]

export function Step5Extras() {
  const { extras, customExtra, toggleExtra, setCustomExtra } = useOuting()
  const [showCustom, setShowCustom] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="기타 요구사항">
        {EXTRA_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={extras.includes(opt.value)}
            onClick={() => toggleExtra(opt.value)}
            className={`px-3 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer
              ${extras.includes(opt.value)
                ? 'bg-[#378ADD] text-white border-[#378ADD] shadow-sm'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#378ADD] hover:text-[#378ADD]'
              }`}
          >
            {opt.label}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={showCustom}
          onClick={() => setShowCustom(!showCustom)}
          className={`px-3 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer
            ${showCustom
              ? 'bg-[#378ADD] text-white border-[#378ADD]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#378ADD] hover:text-[#378ADD]'
            }`}
        >
          ✏️ 직접 입력
        </button>
      </div>

      {showCustom && (
        <div>
          <textarea
            value={customExtra}
            onChange={(e) => setCustomExtra(e.target.value)}
            placeholder="원하는 조건을 자유롭게 입력해주세요 (예: 숲이 있는 곳, 동물 관찰 가능한 곳)"
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#378ADD] resize-none"
            aria-label="기타 요구사항 직접 입력"
          />
        </div>
      )}

      {extras.length === 0 && !customExtra && (
        <p className="text-sm text-gray-400 text-center py-2">선택 사항입니다. 건너뛰어도 됩니다.</p>
      )}
    </div>
  )
}
