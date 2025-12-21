import { useEffect, useRef } from 'react'
import { useYouTube } from './YouTubeContext'

export function YouTubePlayer() {
  const { playerRef, setIsReady, videoId } = useYouTube()
  const containerRef = useRef<HTMLDivElement>(null)
  const isApiLoaded = useRef(false)

  useEffect(() => {
    // Load YouTube IFrame API
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer()
        return
      }

      if (isApiLoaded.current) return
      isApiLoaded.current = true

      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        createPlayer()
      }
    }

    const createPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }

      playerRef.current = new window.YT.Player('youtube-player', {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          start: 143, // Start at 2:23
        },
        events: {
          onReady: () => {
            setIsReady(true)
          },
        },
      })
    }

    loadYouTubeAPI()

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [videoId, playerRef, setIsReady])

  return (
    <div className="youtube-player-container" ref={containerRef}>
      <div className="youtube-player-wrapper">
        <div id="youtube-player" />
      </div>
    </div>
  )
}
