import { useState, useEffect } from 'react'

const BASE_URL = '/api'

export function useApi<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!path) return
    setLoading(true)
    setError(null)
    fetch(`${BASE_URL}${path}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [path])

  return { data, loading, error }
}

export async function post<T>(path: string, body: unknown): Promise<T> {
  const r = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!r.ok) {
    const detail = await r.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(detail.detail || `HTTP ${r.status}`)
  }
  return r.json()
}
