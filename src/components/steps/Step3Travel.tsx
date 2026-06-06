import { useOuting } from '../../hooks/useOuting'
import { ChipGroup } from '../ui/ChipGroup'
import type { OutingState } from '../../types'

const transportOptions = [
  { label: '🚗 자가용', value: 'car' },
  { label: '🚌 대중교통', value: 'transit' },
  { label: '🤷 무관', value: 'any' },
]

const travelTimeOptions = [
  { label: '30분 이내', value: '30min' },
  { label: '1시간 이내', value: '1hr' },
  { label: '1~2시간', value: '1-2hr' },
  { label: '2시간 이상', value: '2hr+' },
]

export function Step3Travel() {
  const { transport, maxTravelTime, setTransport, setMaxTravelTime } = useOuting()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">이동 수단</p>
        <ChipGroup
          options={transportOptions}
          selected={transport}
          onSelect={(v) => setTransport(v as OutingState['transport'])}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">최대 이동 시간</p>
        <ChipGroup
          options={travelTimeOptions}
          selected={maxTravelTime}
          onSelect={(v) => setMaxTravelTime(v as OutingState['maxTravelTime'])}
        />
      </div>
    </div>
  )
}
