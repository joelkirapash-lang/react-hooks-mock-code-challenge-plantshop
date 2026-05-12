import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

// All plant names contain 'p' (for search 'p' = 3 results)
// 'Aloe Plant' also contains 'aloe' (for search 'aloe' = 1 result)
global.basePlants = [
  { id: 1, name: 'Aloe Plant', image: 'https://via.placeholder.com/400', price: 15.99 },
  { id: 2, name: 'ZZ Plant', image: 'https://via.placeholder.com/400', price: 25.98 },
  { id: 3, name: 'Pothos', image: 'https://via.placeholder.com/400', price: 12.11 },
]

global.setFetchResponse = (data) => {
  global.fetch = vi.fn((url, options) => {
    if (options && options.method === 'POST') {
      const body = JSON.parse(options.body)
      return Promise.resolve({
        json: () => Promise.resolve({ id: Date.now(), ...body })
      })
    }
    return Promise.resolve({
      json: () => Promise.resolve(data || [])
    })
  })
}

// Ensure fetch is always mocked before each test
beforeEach(() => {
  global.setFetchResponse(global.basePlants)
})

// Cleanup after each test
afterEach(cleanup)
