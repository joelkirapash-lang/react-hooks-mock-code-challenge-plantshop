import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from '../../components/App'

const plants = [
  { id: 1, name: 'Aloe', image: 'https://via.placeholder.com/400', price: 15.99 },
]

beforeEach(() => {
  global.fetch = vi.fn((url, options) => {
    if (options && options.method === 'POST') {
      const body = JSON.parse(options.body)
      return Promise.resolve({ json: () => Promise.resolve({ id: 4, ...body }) })
    }
    return Promise.resolve({ json: () => Promise.resolve(plants) })
  })
})

test('adds a new plant on form submission', async () => {
  render(<App />)
  await waitFor(() => expect(screen.getByText('Aloe')).toBeInTheDocument())
  fireEvent.change(screen.getByPlaceholderText('Plant name'), { target: { value: 'Cactus' } })
  fireEvent.change(screen.getByPlaceholderText('Image URL'), { target: { value: 'https://via.placeholder.com/400' } })
  fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '9.99' } })
  fireEvent.click(screen.getByText('Add Plant'))
  await waitFor(() => expect(screen.getByText('Cactus')).toBeInTheDocument())
})