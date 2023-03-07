import { useEffect, useState } from 'react'
import { Todo } from '..'

export const useItems = (): { data: Todo[]; loading: boolean; error: boolean; run: () => Promise<void> } => {
  const [data, setData] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  console.log('response', data)
  const run = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')

      if (!response.ok) {
        throw new Error('Failed to fetch')
      }
      const data = await response.json()

      setData(data)
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    run()
  }, [])

  return { data, loading, error, run }
}
