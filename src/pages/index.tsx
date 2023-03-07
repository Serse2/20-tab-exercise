/**
 * Test 20tab - frontend dev - Novembre 2021
 *
 * Rifattorizzare la pagina apportando tutte le migliorie che si ritiene opportune.
 * Dove possibile motivare le proprie scelte con dei commenti all’interno del codice.
 * L'eventuale aggiunta di test è valutata positivamente.
 */

import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useItems } from './hooks/useItems'
import Link from 'next/link'

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

const Home: NextPage = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Todo[]>([])

  const { data, loading, error, run } = useItems()

  useEffect(() => {
    const results = data.filter((item) => item.title.includes(search))
    setResults(results)
  }, [search, data])

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleOnClickDelete = (id: number) => {
    setResults(results.filter((item) => item.id !== id))
  }

  if (loading) return <p>Loading...</p>

  if (error)
    return (
      <div>
        <p>Error</p>
        <button onClick={() => run()}>please try again </button>
      </div>
    )

  return (
    <div style={styles.container}>
      <main style={styles.main as React.CSSProperties}>
        <input style={styles.search} value={search} onChange={handleOnChangeInput} placeholder="Search todo..." />
        {results.length > 0 ? (
          results.map(({ id, title, completed }) => (
            <div key={id} style={styles.item}>
              <Link href={`/todo/${id}`} title={`Go on ${title}`}>
                {title}
              </Link>
              {completed ? <p>✅</p> : null}
              <button onClick={() => handleOnClickDelete(id)}>Delete</button>
            </div>
          ))
        ) : (
          <div>
            <h3>Element not found</h3>
          </div>
        )}
      </main>
    </div>
  )
}

const styles = {
  container: {
    padding: '0.5rem',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  item: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid whitesmoke',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    padding: '0.5rem',
    marginBottom: '0.5rem',
    width: '100%',
    color: 'black',
    border: '1px solid black',
  },
}

export default Home
