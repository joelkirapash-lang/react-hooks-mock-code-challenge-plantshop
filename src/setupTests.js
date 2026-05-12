import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

global.basePlants = [
  { id: 1, name: 'Aloe Plant', image: 'https://via.placeholder.com/400', price: 15.99 },
  { id: 2, name: 'ZZ Plant', image: 'https://via.placeholder.com/400', price: 25.98 },
  { id: 3, name: 'Pothos', image: 'https://via.placeholder.com/400', price: 12.11 },
]

global.setFetchResponse = (data) => {
  global.fetch = async function(url, options) {
    if (options && options.method === 'POST') {
      const body = JSON.parse(options.body)
      return { json: async () => ({ id: Date.now(), ...body }) }
    }
    return { json: async () => (Array.isArray(data) ? data : []) }
  }
}

beforeEach(() => {
  global.setFetchResponse(global.basePlants)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
