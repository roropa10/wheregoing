import { useOuting } from '../../hooks/useOuting'
import { ChipGroup } from '../ui/ChipGroup'
import type { OutingState } from '../../types'

const envOptions = [
  { label: '🏠 실내', value: 'indoor' },
  { label: '🌿 야외', value: 'outdoor' },
  { label: '⛺ 반실내', value: 'semi' },
  { label: '🤷 무관', value: 'any' },
]

const moodOptions = [
  { label: '🌳 자연힐링', value: '자연힐링' },
  { label: '🔬 체험교육', value: '체험교육' },
  { label: '🎡 놀이액티비티', value: '놀이액티비티' },
  { label: '🍽 맛집식도락', value: '맛집식도락' },
  { label: '🎨 문화예술', value: '문화예술' },
  { label: '🛍 쇼핑', value: '쇼핑' },
]

const budgetOptions = [
  { label: '3만원 미만', value: 'under30k' },
  { label: '3~5만원', value: '30k-50k' },
  { label: '5~10만원', value: '50k-100k' },
  { label: '10~20만원', value: '100k-200k' },
  { label: '20만원 이상', value: 'over200k' },
  { label: '제한 없음', value: 'unlimited' },
]

const durationOptions = [
  { label: '2~3시간', value: '2-3hr' },
  { label: '반나절(3~4시간)', value: 'half-day' },
  { label: '하루종일', value: 'full-day' },
]

export function Step4Conditions() {
  const { environment, moods, budget, duration, setEnvironment, toggleMood, setBudget, setDuration } = useOuting()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">환경</p>
        <ChipGroup
          options={envOptions}
          selected={environment}
          onSelect={(v) => setEnvironment(v as OutingState['environment'])}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">분위기 <span className="text-xs text-gray-400 font-normal">(중복 선택 가능)</span></p>
        <ChipGroup options={moodOptions} selected={moods} multi onSelect={toggleMood} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">예산 구간</p>
        <ChipGroup options={budgetOptions} selected={budget} onSelect={setBudget} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">나들이 시간</p>
        <ChipGroup
          options={durationOptions}
          selected={duration}
          onSelect={(v) => setDuration(v as OutingState['duration'])}
        />
      </div>
    </div>
  )
}
