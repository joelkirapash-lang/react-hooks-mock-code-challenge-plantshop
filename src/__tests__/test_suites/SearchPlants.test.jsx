import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from '../../components/App'

const plants = [
  { id: 1, name: 'Aloe', image: 'https://via.placeholder.com/400', price: 15.99 },
  { id: 2, name: 'ZZ Plant', image: 'https://via.placeholder.com/400', price: 25.98 },
]

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(plants) })
  )
})

test('filters plants by search input', async () => {
  render(<App />)
  await waitFor(() => expect(screen.getByText('Aloe')).toBeInTheDocument())
  fireEvent.change(screen.getByPlaceholderText('Type a name to search...'), { target: { value: 'Aloe' } })
  expect(screen.getByText('Aloe')).toBeInTheDocument()
  expect(screen.queryByText('ZZ Plant')).not.toBeInTheDocument()
})