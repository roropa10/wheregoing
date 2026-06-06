import type { Place } from '../../types'
import { AmenityBadge } from './AmenityBadge'

const RANK_COLORS = ['', 'bg-yellow-400', 'bg-gray-300', 'bg-amber-600']
const RANK_EMOJI = ['', '🥇', '🥈', '🥉']

interface PlaceCardProps {
  place: Place
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <article
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      aria-label={`${place.rank}순위 추천 장소: ${place.name}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#378ADD] to-[#5B9EE1] px-5 py-4">
        <div className="flex items-start gap-3">
          <span
            className={`${RANK_COLORS[place.rank]} text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
            aria-hidden="true"
          >
            {place.rank}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">{RANK_EMOJI[place.rank]}</span>
              <h3 className="text-white font-bold text-lg leading-tight truncate">{place.name}</h3>
            </div>
            <p className="text-blue-100 text-sm mt-1 leading-relaxed">{place.tagline}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Location & Time */}
        <div className="flex flex-col gap-1.5 text-sm">
          <div className="flex items-start gap-2 text-gray-600">
            <span aria-hidden="true">📍</span>
            <span>{place.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span aria-hidden="true">🕐</span>
            <span>{place.travelTime}</span>
          </div>
        </div>

        {/* Reason */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">추천 이유</p>
          <p className="text-sm text-gray-700 leading-relaxed">{place.reason}</p>
        </div>

        {/* Highlights */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">주요 볼거리</p>
          <ul className="space-y-1" aria-label="주요 볼거리">
            {place.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-[#378ADD] font-bold flex-shrink-0">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Amenities */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">유아 편의 시설</p>
          <div className="grid grid-cols-4 gap-2">
            <AmenityBadge icon="🦽" label="유모차" available={place.amenities.stroller} />
            <AmenityBadge icon="🤱" label="수유실" available={place.amenities.nursingRoom} />
            <AmenityBadge icon="🧷" label="기저귀" available={place.amenities.diaperRoom} />
            <AmenityBadge icon="🅿️" label="주차" available={place.amenities.parking} />
          </div>
        </div>

        {/* Cost */}
        <div className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3">
          <span className="text-sm font-semibold text-blue-800">예상 비용</span>
          <span className="text-base font-bold text-[#378ADD]">{place.estimatedCost}</span>
        </div>

        {/* Tip */}
        <div className="bg-amber-50 rounded-xl px-4 py-3 flex items-start gap-2">
          <span className="text-lg flex-shrink-0" aria-hidden="true">💡</span>
          <div>
            <p className="text-xs font-semibold text-amber-800 mb-0.5">현장 팁</p>
            <p className="text-sm text-amber-700">{place.tip}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
