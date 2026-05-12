import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

// Cleanup after each test to prevent state bleeding between tests
afterEach(cleanup)

// Restore original plants including Aloe (needed for 'aloe' search test)
global.basePlants = [
  { id: 1, name: 'Aloe', image: 'https://via.placeholder.com/400', price: 15.99 },
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
