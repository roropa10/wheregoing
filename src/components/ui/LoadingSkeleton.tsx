export function LoadingSkeleton() {
  return (
    <div className="space-y-4 px-4 py-6 max-w-2xl mx-auto w-full">
      <div className="text-center mb-6">
        <div className="inline-block animate-spin text-4xl mb-3">🧭</div>
        <p className="text-gray-500 text-sm">AI가 최적의 나들이 장소를 찾고 있어요...</p>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-pulse">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="w-8 h-8 bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
