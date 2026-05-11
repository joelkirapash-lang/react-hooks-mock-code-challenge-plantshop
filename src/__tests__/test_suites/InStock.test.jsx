import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from '../../components/App'

const plants = [
  { id: 1, name: 'Aloe', image: 'https://via.placeholder.com/400', price: 15.99 },
]

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(plants) })
  )
})

test('marks a plant as out of stock', async () => {
  render(<App />)
  await waitFor(() => expect(screen.getByText('Aloe')).toBeInTheDocument())
  const button = screen.getByText('In Stock')
  fireEvent.click(button)
  expect(screen.getByText('Out of Stock')).toBeInTheDocument()
})