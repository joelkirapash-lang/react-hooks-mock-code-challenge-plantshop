import '@testing-library/jest-dom'

// Setup global test data
global.basePlants = [
  { id: 1, name: 'Aloe', image: 'https://via.placeholder.com/400', price: 15.99 },
  { id: 2, name: 'ZZ Plant', image: 'https://via.placeholder.com/400', price: 25.98 },
  { id: 3, name: 'Pothos', image: 'https://via.placeholder.com/400', price: 12.11 },
]

// Setup global fetch mock helper
global.setFetchResponse = (data) => {
  global.fetch = vi.fn((url, options) => {
    if (options && options.method === 'POST') {
      const body = JSON.parse(options.body)
      return Promise.resolve({
        json: () => Promise.resolve({ id: Date.now(), ...body })
      })
    }
    return Promise.resolve({
      json: () => Promise.resolve(data)
    })
  })
}
