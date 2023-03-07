import Home from '.'
import { fireEvent, render, screen } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

const data = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
]

const run = jest.fn()

describe('Index page', () => {
  it('should render correctly with data', () => {
    jest.spyOn(require('./hooks/useItems'), 'useItems').mockReturnValue({
      error: false,
      loading: false,
      data,
    })
    render(<Home />)
    expect(screen.getByText('delectus aut autem')).toBeInTheDocument()
    expect(screen.getByText('quis ut nam facilis et officia qui')).toBeInTheDocument()
    expect(screen.getByText('fugiat veniam minus')).toBeInTheDocument()
  })
  it('should render correctly the loading component if the fetch is loading', () => {
    jest.spyOn(require('./hooks/useItems'), 'useItems').mockReturnValue({
      error: false,
      loading: true,
      data,
    })
    render(<Home />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('delectus aut autem')).not.toBeInTheDocument()
    expect(screen.queryByText('quis ut nam facilis et officia qui')).not.toBeInTheDocument()
    expect(screen.queryByText('fugiat veniam minus')).not.toBeInTheDocument()
  })
  it('should render correctly the error component if the fetch throw error', () => {
    jest.spyOn(require('./hooks/useItems'), 'useItems').mockReturnValue({
      error: true,
      loading: false,
      data,
    })
    render(<Home />)
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.queryByText('delectus aut autem')).not.toBeInTheDocument()
    expect(screen.queryByText('quis ut nam facilis et officia qui')).not.toBeInTheDocument()
    expect(screen.queryByText('fugiat veniam minus')).not.toBeInTheDocument()
  })
  it('should render correctly the error component if the fetch throw error and press the try again', () => {
    jest.spyOn(require('./hooks/useItems'), 'useItems').mockReturnValue({
      error: true,
      loading: false,
      data,
      run: run,
    })
    render(<Home />)
    expect(screen.getByText('Error')).toBeInTheDocument()
    fireEvent.click(screen.getByText('please try again'))
    expect(run).toHaveBeenCalled()
    expect(run).toHaveBeenCalledTimes(1)
  })
  it('should render correctly with data that are filtered', () => {
    jest.spyOn(require('./hooks/useItems'), 'useItems').mockReturnValue({
      error: false,
      loading: false,
      data,
    })
    render(<Home />)
    fireEvent.change(screen.getByPlaceholderText('Search todo...'), { target: { value: 'delectus' } })
    expect(screen.getByText('delectus aut autem')).toBeInTheDocument()
    expect(screen.queryByText('quis ut nam facilis et officia qui')).not.toBeInTheDocument()
    expect(screen.queryByText('fugiat veniam minus')).not.toBeInTheDocument()
  })
})
