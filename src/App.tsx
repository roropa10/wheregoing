import { useState } from 'react'
import { useOuting } from './hooks/useOuting'
import { Step1Region } from './components/steps/Step1Region'
import { Step2Members } from './components/steps/Step2Members'
import { Step3Travel } from './components/steps/Step3Travel'
import { Step4Conditions } from './components/steps/Step4Conditions'
import { Step5Extras } from './components/steps/Step5Extras'
import { PlaceCard } from './components/result/PlaceCard'
import { ClosingMessage } from './components/result/ClosingMessage'
import { LoadingSkeleton } from './components/ui/LoadingSkeleton'

const STEPS = [
  { title: '출발 지역', subtitle: '어디서 출발하나요?' },
  { title: '동행 인원', subtitle: '몇 명이 함께 가나요?' },
  { title: '이동 조건', subtitle: '어떻게 이동하시나요?' },
  { title: '나들이 조건', subtitle: '어떤 나들이를 원하세요?' },
  { title: '기타 요구사항', subtitle: '꼭 필요한 조건이 있나요?' },
]

function canProceed(step: number, state: ReturnType<typeof useOuting.getState>) {
  if (step === 0) return state.sido !== '' && state.sigungu !== ''
  if (step === 1) return state.adults >= 1
  return true
}

export default function App() {
  const store = useOuting()
  const { step, setStep, result, loading, error, fetchRecommendations, reset, apiKey, setApiKey } = store
  const [showApiInput, setShowApiInput] = useState(!apiKey)
  const [localApiKey, setLocalApiKey] = useState(apiKey)

  const isResultView = step === 6

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else if (step === 4) {
      if (!apiKey) {
        setShowApiInput(true)
      } else {
        fetchRecommendations()
      }
    }
  }

  const handleSubmitKey = () => {
    setApiKey(localApiKey.trim())
    setShowApiInput(false)
    if (localApiKey.trim()) fetchRecommendations()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#378ADD] text-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          {!isResultView && step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              aria-label="이전 단계로"
              className="mr-1 p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              ←
            </button>
          )}
          {isResultView && (
            <button
              onClick={reset}
              aria-label="처음으로"
              className="mr-1 p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              ←
            </button>
          )}
          <span className="text-xl font-bold">🧭 오늘 어디 갈까?</span>
        </div>
        <button
          onClick={() => setShowApiInput(true)}
          className="text-xs bg-white/20 hover:bg-white/30 transition-colors px-2 py-1 rounded-full"
          aria-label="API 키 설정"
        >
          🔑 API 키
        </button>
      </header>

      {/* API Key Modal */}
      {showApiInput && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="api-key-title"
        >
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h2 id="api-key-title" className="text-lg font-bold text-gray-800 mb-2">
              Anthropic API 키 입력
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Claude API 키를 입력하면 AI 추천을 받을 수 있어요.
              <br />
              키는 브라우저에 저장되지 않습니다.
            </p>
            <input
              type="password"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#378ADD] mb-4"
              aria-label="Anthropic API 키"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitKey()}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowApiInput(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSubmitKey}
                disabled={!localApiKey.trim()}
                className="flex-1 py-2.5 rounded-xl bg-[#378ADD] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#2a6cb0] transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && <LoadingSkeleton />}

      {/* Error */}
      {error && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 max-w-sm w-full text-center">
            <p className="text-4xl mb-3">😢</p>
            <p className="text-gray-800 font-semibold mb-2">추천을 받지 못했어요</p>
            <p className="text-sm text-red-500 mb-5">{error}</p>
            <button
              onClick={fetchRecommendations}
              className="w-full py-3 bg-[#378ADD] text-white rounded-xl font-semibold hover:bg-[#2a6cb0] transition-colors"
            >
              다시 시도하기
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {isResultView && result && !loading && (
        <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full space-y-4">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
            ✨ AI 추천 나들이 장소 3곳
          </h2>
          {result.places.map((place) => (
            <PlaceCard key={place.rank} place={place} />
          ))}
          <ClosingMessage message={result.closingMessage} />
          <div className="pb-6">
            <button
              onClick={reset}
              className="w-full py-4 bg-[#378ADD] text-white rounded-2xl font-bold text-base hover:bg-[#2a6cb0] transition-colors shadow-sm"
            >
              🔄 다시 추천받기
            </button>
          </div>
        </main>
      )}

      {/* Steps */}
      {!isResultView && !loading && !error && (
        <>
          {/* Step Progress */}
          <div className="px-4 pt-5 pb-2 max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500 font-medium">
                {step + 1} / {STEPS.length}
              </span>
              <span className="text-xs text-[#378ADD] font-semibold">
                {STEPS[step].title}
              </span>
            </div>
            <div
              className="w-full bg-gray-200 rounded-full h-1.5"
              role="progressbar"
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={5}
            >
              <div
                className="bg-[#378ADD] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <main className="flex-1 px-4 pb-32 max-w-2xl mx-auto w-full">
            <div className="pt-4 pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {STEPS[step].title}
              </h2>
              <p className="text-sm text-gray-500 mb-5">{STEPS[step].subtitle}</p>

              {step === 0 && <Step1Region />}
              {step === 1 && <Step2Members />}
              {step === 2 && <Step3Travel />}
              {step === 3 && <Step4Conditions />}
              {step === 4 && <Step5Extras />}
            </div>
          </main>

          {/* Fixed Bottom Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
            <div className="max-w-2xl mx-auto">
              <button
                onClick={handleNext}
                disabled={!canProceed(step, store)}
                aria-label={step === 4 ? 'AI 추천 받기' : '다음 단계로'}
                className="w-full py-4 bg-[#378ADD] text-white rounded-2xl font-bold text-base disabled:opacity-40 hover:bg-[#2a6cb0] transition-colors shadow-sm disabled:cursor-not-allowed"
              >
                {step === 4 ? '🧭 AI 추천 받기' : '다음 →'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
