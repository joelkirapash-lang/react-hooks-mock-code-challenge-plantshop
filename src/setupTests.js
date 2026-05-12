import '@testing-library/jest-dom'

// All plant names contain 'p' so search for 'p' returns all 3
global.basePlants = [
  { id: 1, name: 'Pilea', image: 'https://via.placeholder.com/400', price: 15.99 },
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
