import { renderHook, waitFor } from '@testing-library/react'
import { useItems } from './useItems'

const mockedData = [{ id: 1, title: 'delectus aut autem', completed: false }]

describe('useItems', () => {
  test('should fetch data and return the correct data', async () => {
    global.fetch = jest.fn().mockReturnValueOnce({ json: () => Promise.resolve(mockedData), ok: true })
    const { result, rerender } = renderHook(() => useItems())
    rerender()
    await waitFor(() => {
      expect(result.current.data).toStrictEqual(mockedData)
      expect(result.current.error).toStrictEqual(false)
      expect(result.current.loading).toStrictEqual(false)
    })
  }),
    test('should fetch data with error', async () => {
      global.fetch = jest.fn().mockReturnValueOnce({ json: () => Promise.resolve([]), ok: false })
      const { result, rerender } = renderHook(() => useItems())
      rerender()
      await waitFor(() => {
        expect(result.current.data).toStrictEqual([])
        expect(result.current.error).toStrictEqual(true)
        expect(result.current.loading).toStrictEqual(false)
      })
    })
})
