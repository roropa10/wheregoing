import { regions } from '../../data/regions'
import { useOuting } from '../../hooks/useOuting'

export function Step1Region() {
  const { sido, sigungu, setSido, setSigungu } = useOuting()
  const sidoList = Object.keys(regions)
  const sigunguList = sido ? regions[sido] : []

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="sido-select" className="block text-sm font-semibold text-gray-700 mb-2">
          광역시도 선택
        </label>
        <select
          id="sido-select"
          value={sido}
          onChange={(e) => setSido(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#378ADD] focus:border-transparent text-base"
          aria-label="광역시도를 선택하세요"
        >
          <option value="">시/도를 선택하세요</option>
          {sidoList.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {sido && (
        <div>
          <label htmlFor="sigungu-select" className="block text-sm font-semibold text-gray-700 mb-2">
            시·군·구 선택
          </label>
          <select
            id="sigungu-select"
            value={sigungu}
            onChange={(e) => setSigungu(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#378ADD] focus:border-transparent text-base"
            aria-label="시군구를 선택하세요"
          >
            <option value="">시/군/구를 선택하세요</option>
            {sigunguList.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      {sido && sigungu && (
        <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700 flex items-center gap-2">
          <span>📍</span>
          <span><strong>{sido} {sigungu}</strong>에서 출발합니다</span>
        </div>
      )}
    </div>
  )
}
