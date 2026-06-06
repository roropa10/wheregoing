import { GoogleGenerativeAI } from '@google/generative-ai'
import type { OutingState, RecommendationResult } from '../types'

const TRANSPORT_LABEL: Record<string, string> = {
  car: '자가용', transit: '대중교통', any: '무관',
}
const TRAVEL_TIME_LABEL: Record<string, string> = {
  '30min': '30분 이내', '1hr': '1시간 이내',
  '1-2hr': '1~2시간', '2hr+': '2시간 이상',
}
const ENV_LABEL: Record<string, string> = {
  indoor: '실내', outdoor: '야외', semi: '반실내', any: '무관',
}
const BUDGET_LABEL: Record<string, string> = {
  'under30k': '3만원 미만', '30k-50k': '3만원~5만원',
  '50k-100k': '5만원~10만원', '100k-200k': '10만원~20만원',
  'over200k': '20만원 이상', 'unlimited': '제한 없음',
}
const DURATION_LABEL: Record<string, string> = {
  '2-3hr': '2~3시간', 'half-day': '반나절(3~4시간)', 'full-day': '하루종일',
}

export async function getRecommendations(
  state: OutingState,
  apiKey: string
): Promise<RecommendationResult> {
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: { responseMimeType: 'application/json' },
    systemInstruction: `당신은 대한민국 가족 나들이 전문 여행 컨설턴트입니다.
유아 동반 가족의 현실적 조건을 정확히 이해하고, 실존하는 장소만 추천합니다.
JSON 형식으로만 응답합니다.`,
  })

  const childAgesText = state.childAges.length > 0
    ? state.childAges.map((age, i) => `아이${i + 1}: ${age}세`).join(', ')
    : '나이 미입력'

  const moodsText = state.moods.length > 0 ? state.moods.join(', ') : '무관'
  const extrasText = [
    ...state.extras,
    ...(state.customExtra.trim() ? [state.customExtra.trim()] : []),
  ].join(', ') || '없음'

  const prompt = `아래 조건에 맞는 나들이 장소 3곳을 추천해주세요.

[조건]
출발지: ${state.sido} ${state.sigungu}
이동수단: ${TRANSPORT_LABEL[state.transport]} / 최대 이동시간: ${TRAVEL_TIME_LABEL[state.maxTravelTime]}
동행인원: 성인 ${state.adults}명, 아이 ${state.childCount}명 (${childAgesText})
환경: ${ENV_LABEL[state.environment]}
분위기: ${moodsText}
예산: ${BUDGET_LABEL[state.budget]}
나들이 시간: ${DURATION_LABEL[state.duration]}
필수 조건: ${extrasText}

[응답 형식 — 반드시 아래 JSON만 반환]
{
  "places": [
    {
      "rank": 1,
      "name": "장소명",
      "tagline": "한 줄 이유",
      "address": "주소",
      "travelTime": "약 OO분",
      "reason": "추천 이유",
      "highlights": ["볼거리1","볼거리2","볼거리3"],
      "amenities": {
        "stroller": true,
        "nursingRoom": true,
        "diaperRoom": false,
        "parking": true
      },
      "estimatedCost": "약 OO원",
      "tip": "현장 팁"
    }
  ],
  "closingMessage": "오늘 나들이 한마디"
}`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('응답 파싱 오류')
  return JSON.parse(jsonMatch[0]) as RecommendationResult
}
