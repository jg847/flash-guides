import { http, HttpResponse } from 'msw'

export const FAL_BASE_URL = 'https://fal.run'
export const FAL_MODEL_PATH = 'fal-ai/flux/schnell'

export const MOCK_FAL_RESPONSE = {
  images: [
    {
      url: 'https://fal.run/files/mock-image-abc123.jpg',
      width: 512,
      height: 512,
      content_type: 'image/jpeg',
    },
  ],
  timings: { inference: 0.5 },
  seed: 12345,
  has_nsfw_concepts: [false],
  prompt: 'test prompt',
}

export const falHandlers = [
  // Successful image generation
  http.post(`${FAL_BASE_URL}/${FAL_MODEL_PATH}`, () => {
    return HttpResponse.json(MOCK_FAL_RESPONSE)
  }),
]

export const falErrorHandlers = {
  rateLimited: http.post(`${FAL_BASE_URL}/${FAL_MODEL_PATH}`, () => {
    return new HttpResponse(null, { status: 429 })
  }),
  serverError: http.post(`${FAL_BASE_URL}/${FAL_MODEL_PATH}`, () => {
    return new HttpResponse(null, { status: 500 })
  }),
  noImages: http.post(`${FAL_BASE_URL}/${FAL_MODEL_PATH}`, () => {
    return HttpResponse.json({ images: [] })
  }),
}
