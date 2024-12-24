import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    navigate(`/order/${query}`)
    setQuery('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Search order #'
        value={query}
        onChange={e => setQuery(e.target.value)}
        className='w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:w-[9rem] focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50 sm:w-64 sm:focus:w-72'
      />
    </form>
  )
}
