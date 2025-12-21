import { useEffect, useState } from 'react'
import { useSidenotes } from './SidenotesContext'
import { useIsMobile } from '../../hooks/useIsMobile'

interface FootnoteItem {
  id: string
  number: string
  contentHtml: string // HTML content to preserve images and formatting
}

export function Sidenotes() {
  const { positions } = useSidenotes()
  const isMobile = useIsMobile()
  const [footnotes, setFootnotes] = useState<FootnoteItem[]>([])

  useEffect(() => {
    // Extract footnote content from the DOM after render
    const extractFootnotes = () => {
      const footnoteItems: FootnoteItem[] = []
      const footnoteSection = document.querySelector('[data-footnotes]')

      if (footnoteSection) {
        const listItems = footnoteSection.querySelectorAll('li')
        listItems.forEach((li) => {
          const id = li.id // e.g., "user-content-fn-1"
          // Convert fn- to fnref- to match the ref ID (already has user-content- prefix)
          const refId = id.replace('-fn-', '-fnref-')
          const number = id.match(/fn-(\d+)/)?.[1] || ''

          // Clone and remove back-reference link, but preserve HTML (images, etc.)
          const clone = li.cloneNode(true) as HTMLElement
          const backRef = clone.querySelector('a[data-footnote-backref]')
          if (backRef) backRef.remove()

          footnoteItems.push({
            id: refId,
            number,
            contentHtml: clone.innerHTML.trim(),
          })
        })
      }

      setFootnotes(footnoteItems)
    }

    // Wait for MDX to render
    const timer = setTimeout(extractFootnotes, 150)
    return () => clearTimeout(timer)
  }, [positions])

  // Don't render sidenotes on mobile
  if (isMobile) return null

  return (
    <aside className="sidenotes-column">
      {footnotes.map((footnote) => {
        const top = positions[footnote.id]
        if (top === undefined) return null

        return (
          <div
            key={footnote.id}
            className="sidenote"
            style={{ top: `${top}px` }}
          >
            <span className="sidenote-number">{footnote.number}.</span>
            <span dangerouslySetInnerHTML={{ __html: footnote.contentHtml }} />
          </div>
        )
      })}
    </aside>
  )
}
