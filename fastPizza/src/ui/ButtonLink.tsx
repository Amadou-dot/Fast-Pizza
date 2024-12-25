import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonLink({
  children,
  to,
  onClick,
}: {
  children: React.ReactNode
  to?: string
  onClick?: () => void
}) {
  return (
    <Link
      to={to || ''} // Default to '' if no `to` prop is provided
      onClick={onClick || (() => {})}
      className='text-sm text-blue-500 hover:text-blue-600 hover:underline'
    >
      {children}
    </Link>
  )
}
