import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'

interface FootnoteData {
  id: string
  content: ReactNode
}

interface SidenotesContextType {
  registerRef: (id: string, element: HTMLElement) => void
  positions: Record<string, number>
  footnotes: FootnoteData[]
  registerFootnote: (id: string, content: ReactNode) => void
  containerRef: React.RefObject<HTMLDivElement | null>
}

const SidenotesContext = createContext<SidenotesContextType | null>(null)

export function useSidenotes() {
  const context = useContext(SidenotesContext)
  if (!context) {
    throw new Error('useSidenotes must be used within a SidenotesProvider')
  }
  return context
}

interface SidenotesProviderProps {
  children: ReactNode
}

export function SidenotesProvider({ children }: SidenotesProviderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [positions, setPositions] = useState<Record<string, number>>({})
  const [footnotes, setFootnotes] = useState<FootnoteData[]>([])

  const registerRef = useCallback((_id: string, _element: HTMLElement) => {
    // Not used - we query DOM directly instead
  }, [])

  const registerFootnote = useCallback((id: string, content: ReactNode) => {
    setFootnotes((prev) => {
      if (prev.some((f) => f.id === id)) return prev
      return [...prev, { id, content }]
    })
  }, [])

  useEffect(() => {
    const calculatePositions = () => {
      if (!containerRef.current) {
        console.log('Container ref not available')
        return
      }

      // Query DOM directly for footnote refs (remark-gfm adds data-footnote-ref attribute)
      const footnoteRefs = containerRef.current.querySelectorAll('a[data-footnote-ref]')
      console.log('Found footnote refs in DOM:', footnoteRefs.length)

      if (footnoteRefs.length === 0) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newPositions: Record<string, number> = {}
      let lastBottom = 0

      // Get all markers and sort by vertical position
      const sorted = Array.from(footnoteRefs)
        .map((el) => {
          const id = el.id // e.g., "user-content-fnref-1"
          return {
            id,
            top: el.getBoundingClientRect().top - containerRect.top,
          }
        })
        .sort((a, b) => a.top - b.top)

      console.log('Sorted markers:', sorted)

      // Calculate positions, preventing overlap
      const SIDENOTE_MIN_HEIGHT = 80
      const SIDENOTE_GAP = 16

      for (const { id, top } of sorted) {
        let finalTop = top - 5
        // Prevent overlap with previous sidenote
        if (finalTop < lastBottom + SIDENOTE_GAP) {
          finalTop = lastBottom + SIDENOTE_GAP
        }
        newPositions[id] = finalTop
        lastBottom = finalTop + SIDENOTE_MIN_HEIGHT
      }

      console.log('Calculated positions:', newPositions)
      setPositions(newPositions)
    }

    // Calculate after DOM is ready (give MDX time to render)
    const timer = setTimeout(calculatePositions, 300)
    window.addEventListener('resize', calculatePositions)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', calculatePositions)
    }
  }, [])

  return (
    <SidenotesContext.Provider
      value={{
        registerRef,
        positions,
        footnotes,
        registerFootnote,
        containerRef,
      }}
    >
      {children}
    </SidenotesContext.Provider>
  )
}
