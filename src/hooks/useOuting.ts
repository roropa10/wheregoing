import { create } from 'zustand'
import type { OutingState, RecommendationResult } from '../types'
import { getRecommendations } from '../api/claude'

interface OutingStore extends OutingState {
  step: number
  result: RecommendationResult | null
  loading: boolean
  error: string | null
  apiKey: string

  setStep: (step: number) => void
  setSido: (sido: string) => void
  setSigungu: (sigungu: string) => void
  setAdults: (n: number) => void
  setChildCount: (n: number) => void
  setChildAge: (index: number, age: number) => void
  setTransport: (t: OutingState['transport']) => void
  setMaxTravelTime: (t: OutingState['maxTravelTime']) => void
  setEnvironment: (e: OutingState['environment']) => void
  toggleMood: (m: string) => void
  setBudget: (b: string) => void
  setDuration: (d: OutingState['duration']) => void
  toggleExtra: (e: string) => void
  setCustomExtra: (s: string) => void
  setApiKey: (k: string) => void
  fetchRecommendations: () => Promise<void>
  reset: () => void
}

const defaultState: OutingState = {
  sido: '',
  sigungu: '',
  adults: 2,
  childCount: 1,
  childAges: [3],
  transport: 'car',
  maxTravelTime: '1hr',
  environment: 'any',
  moods: [],
  budget: '50k-100k',
  duration: 'half-day',
  extras: [],
  customExtra: '',
}

export const useOuting = create<OutingStore>((set, get) => ({
  ...defaultState,
  step: 0,
  result: null,
  loading: false,
  error: null,
  apiKey: '',

  setStep: (step) => set({ step }),
  setSido: (sido) => set({ sido, sigungu: '' }),
  setSigungu: (sigungu) => set({ sigungu }),
  setAdults: (adults) => set({ adults: Math.max(1, Math.min(10, adults)) }),
  setChildCount: (childCount) => {
    const n = Math.max(0, Math.min(10, childCount))
    const prev = get().childAges
    const childAges = Array.from({ length: n }, (_, i) => prev[i] ?? 3)
    set({ childCount: n, childAges })
  },
  setChildAge: (index, age) => {
    const childAges = [...get().childAges]
    childAges[index] = age
    set({ childAges })
  },
  setTransport: (transport) => set({ transport }),
  setMaxTravelTime: (maxTravelTime) => set({ maxTravelTime }),
  setEnvironment: (environment) => set({ environment }),
  toggleMood: (m) => {
    const moods = get().moods.includes(m)
      ? get().moods.filter((x) => x !== m)
      : [...get().moods, m]
    set({ moods })
  },
  setBudget: (budget) => set({ budget }),
  setDuration: (duration) => set({ duration }),
  toggleExtra: (e) => {
    const extras = get().extras.includes(e)
      ? get().extras.filter((x) => x !== e)
      : [...get().extras, e]
    set({ extras })
  },
  setCustomExtra: (customExtra) => set({ customExtra }),
  setApiKey: (apiKey) => set({ apiKey }),

  fetchRecommendations: async () => {
    const state = get()
    set({ loading: true, error: null, result: null })
    try {
      const result = await getRecommendations(state, state.apiKey)
      set({ result, loading: false, step: 6 })
    } catch (e) {
      set({ error: (e as Error).message || '추천 요청에 실패했습니다.', loading: false })
    }
  },

  reset: () => set({ ...defaultState, step: 0, result: null, error: null }),
}))
