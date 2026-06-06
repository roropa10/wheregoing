import { useOuting } from '../../hooks/useOuting'
import { Stepper } from '../ui/Stepper'

export function Step2Members() {
  const { adults, childCount, childAges, setAdults, setChildCount, setChildAge } = useOuting()

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 px-4">
        <Stepper label="성인" value={adults} min={1} max={10} onChange={setAdults} />
        <Stepper label="아이" value={childCount} min={0} max={10} onChange={setChildCount} />
      </div>

      {childCount > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">아이 나이를 알려주세요</p>
          <div className="space-y-3">
            {Array.from({ length: childCount }, (_, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-14 flex-shrink-0">아이 {i + 1}</span>
                <select
                  value={childAges[i] ?? 3}
                  onChange={(e) => setChildAge(i, Number(e.target.value))}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#378ADD] text-sm"
                  aria-label={`아이 ${i + 1} 나이`}
                >
                  {Array.from({ length: 14 }, (_, age) => (
                    <option key={age} value={age}>
                      {age === 0 ? '0세 (영아)' : age === 13 ? '13세 이상' : `${age}세`}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-amber-50 rounded-xl p-3 text-sm text-amber-700 flex items-start gap-2">
        <span>👨‍👩‍👧‍👦</span>
        <span>
          성인 <strong>{adults}명</strong>
          {childCount > 0 && (
            <>, 아이 <strong>{childCount}명</strong>
            {childAges.slice(0, childCount).length > 0 && ` (${childAges.slice(0, childCount).map(a => `${a}세`).join(', ')})`}
            </>
          )}
        </span>
      </div>
    </div>
  )
}
