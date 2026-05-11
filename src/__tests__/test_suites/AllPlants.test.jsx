import { render, screen, waitFor } from '@testing-library/react'
import App from '../../components/App'

const plants = [
  { id: 1, name: 'Aloe', image: 'https://via.placeholder.com/400', price: 15.99 },
  { id: 2, name: 'ZZ Plant', image: 'https://via.placeholder.com/400', price: 25.98 },
  { id: 3, name: 'Pothos', image: 'https://via.placeholder.com/400', price: 12.11 },
]

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(plants) })
  )
})

test('renders all plants on page load', async () => {
  render(<App />)
  await waitFor(() => {
    expect(screen.getByText('Aloe')).toBeInTheDocument()
    expect(screen.getByText('ZZ Plant')).toBeInTheDocument()
    expect(screen.getByText('Pothos')).toBeInTheDocument()
  })
})