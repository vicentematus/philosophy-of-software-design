import type { ReactNode } from 'react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip'
  children: ReactNode
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const icons = {
    info: 'i',
    warning: '!',
    tip: '*',
  }

  return (
    <div className={`callout callout--${type}`}>
      <span className="callout-icon">{icons[type]}</span>
      <div className="callout-content">{children}</div>
    </div>
  )
}
