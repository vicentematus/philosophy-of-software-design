import type { ReactNode } from 'react'
import { useYouTube } from './YouTubeContext'

interface TimestampLinkProps {
  t: number // timestamp in seconds
  children: ReactNode
}

export function TimestampLink({ t, children }: TimestampLinkProps) {
  const { seekTo, isReady } = useYouTube()

  const handleClick = () => {
    if (isReady) {
      seekTo(t)
      // No need to scroll - video is sticky at top
    }
  }

  // Format timestamp for display (e.g., 756 -> "12:36")
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <span
      className="timestamp-link"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
      title={`Jump to ${formatTime(t)} in video`}
    >
      {children}
      <span className="timestamp-indicator">{formatTime(t)}</span>
    </span>
  )
}
