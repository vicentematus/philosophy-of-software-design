import type { ReactNode } from 'react'
import { useYouTube } from './YouTubeContext'

interface TimestampBlockProps {
  t: number // timestamp in seconds
  children: ReactNode
}

export function TimestampBlock({ t, children }: TimestampBlockProps) {
  const { seekTo, isReady } = useYouTube()

  const handleClick = () => {
    if (isReady) {
      seekTo(t)
    }
  }

  // Format timestamp for display (e.g., 756 -> "12:36")
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div
      className="timestamp-block"
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
      <span className="timestamp-block-badge">{formatTime(t)}</span>
      {children}
    </div>
  )
}
