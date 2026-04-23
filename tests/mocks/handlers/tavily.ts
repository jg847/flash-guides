import { http, HttpResponse } from 'msw'

export const TAVILY_BASE_URL = 'https://api.tavily.com'

export const MOCK_TAVILY_RESPONSE = {
  query: 'test query',
  response_time: 0.5,
  images: [],
  answer: null,
  results: [
    {
      title: 'Result One',
      url: 'https://example.com/1',
      content: 'Snippet for result one.',
      score: 0.9,
    },
    {
      title: 'Result Two',
      url: 'https://example.com/2',
      content: 'Snippet for result two.',
      score: 0.8,
    },
  ],
}

export const tavilyHandlers = [
  // Successful search
  http.post(`${TAVILY_BASE_URL}/search`, () => {
    return HttpResponse.json(MOCK_TAVILY_RESPONSE)
  }),
]

export const tavilyErrorHandlers = {
  serverError: http.post(`${TAVILY_BASE_URL}/search`, () => {
    return new HttpResponse(null, { status: 500 })
  }),
  rateLimited: http.post(`${TAVILY_BASE_URL}/search`, () => {
    return new HttpResponse(null, { status: 429 })
  }),
  emptyResults: http.post(`${TAVILY_BASE_URL}/search`, () => {
    return HttpResponse.json({
      query: 'test',
      response_time: 0.1,
      images: [],
      answer: null,
      results: [],
    })
  }),
}
