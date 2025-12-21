import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MutableRefObject,
} from 'react'

// YouTube IFrame API types
declare global {
  interface Window {
    YT: typeof YT
    onYouTubeIframeAPIReady: () => void
  }
}

declare namespace YT {
  class Player {
    constructor(elementId: string, options: PlayerOptions)
    seekTo(seconds: number, allowSeekAhead: boolean): void
    playVideo(): void
    pauseVideo(): void
    destroy(): void
  }

  interface PlayerOptions {
    videoId: string
    width?: string | number
    height?: string | number
    playerVars?: PlayerVars
    events?: {
      onReady?: (event: PlayerEvent) => void
      onStateChange?: (event: OnStateChangeEvent) => void
    }
  }

  interface PlayerVars {
    autoplay?: 0 | 1
    controls?: 0 | 1
    rel?: 0 | 1
    modestbranding?: 0 | 1
    start?: number
  }

  interface PlayerEvent {
    target: Player
  }

  interface OnStateChangeEvent {
    data: number
    target: Player
  }

  const PlayerState: {
    ENDED: number
    PLAYING: number
    PAUSED: number
    BUFFERING: number
    CUED: number
  }
}

interface YouTubeContextType {
  seekTo: (seconds: number) => void
  playerRef: MutableRefObject<YT.Player | null>
  isReady: boolean
  setIsReady: (ready: boolean) => void
  videoId: string
}

const YouTubeContext = createContext<YouTubeContextType | null>(null)

export function useYouTube() {
  const context = useContext(YouTubeContext)
  if (!context) {
    throw new Error('useYouTube must be used within a YouTubeProvider')
  }
  return context
}

interface YouTubeProviderProps {
  children: ReactNode
  videoId: string
}

export function YouTubeProvider({ children, videoId }: YouTubeProviderProps) {
  const playerRef = useRef<YT.Player | null>(null)
  const [isReady, setIsReady] = useState(false)

  const seekTo = useCallback((seconds: number) => {
    if (playerRef.current && isReady) {
      playerRef.current.seekTo(seconds, true)
      playerRef.current.playVideo()
    }
  }, [isReady])

  return (
    <YouTubeContext.Provider
      value={{
        seekTo,
        playerRef,
        isReady,
        setIsReady,
        videoId,
      }}
    >
      {children}
    </YouTubeContext.Provider>
  )
}
