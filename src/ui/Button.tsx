import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({
  children,
  disabled = false,
  to,
  onclick,
  type = 'primary',
}: {
  children: React.ReactNode
  disabled?: boolean
  to?: string
  onclick?: () => void
  type?: 'primary' | 'secondary' | 'small'
}) {
  const base =
    'bg-yellow-400 rounded-full text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-wait hover:bg-yellow-300'

  const secondary =
    'rounded-full text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-wait border border-stone-400 px-4 py-3 md:px-6 md:py-4'
  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-2 py-2 md:px-4 md:py-2.5 text-xs',
    secondary,
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`${styles[type]} ${disabled ? 'pointer-events-none opacity-50' : ''}`}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      onClick={onclick || (() => {})}
      disabled={disabled}
      className={`${styles[type]} ${disabled ? 'pointer-events-none opacity-50' : ''}`}
    >
      {children}
    </button>
  )
}
