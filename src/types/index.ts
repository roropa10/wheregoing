export interface OutingState {
  // Step 1
  sido: string
  sigungu: string
  // Step 2
  adults: number
  childCount: number
  childAges: number[]
  // Step 3
  transport: 'car' | 'transit' | 'any'
  maxTravelTime: '30min' | '1hr' | '1-2hr' | '2hr+'
  // Step 4
  environment: 'indoor' | 'outdoor' | 'semi' | 'any'
  moods: string[]
  budget: string
  duration: '2-3hr' | 'half-day' | 'full-day'
  // Step 5
  extras: string[]
  customExtra: string
}

export interface PlaceAmenities {
  stroller: boolean
  nursingRoom: boolean
  diaperRoom: boolean
  parking: boolean
}

export interface Place {
  rank: number
  name: string
  tagline: string
  address: string
  travelTime: string
  reason: string
  highlights: string[]
  amenities: PlaceAmenities
  estimatedCost: string
  tip: string
}

export interface RecommendationResult {
  places: Place[]
  closingMessage: string
}
