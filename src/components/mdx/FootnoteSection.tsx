import { type HTMLAttributes, type ReactNode } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

interface FootnoteSectionProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  'data-footnotes'?: boolean
}

export function FootnoteSection({
  children,
  ...props
}: FootnoteSectionProps) {
  const isMobile = useIsMobile()

  // Check for footnotes section - MDX passes it as 'data-footnotes' prop
  const isFootnotes = 'data-footnotes' in props || props.className?.includes('footnotes')

  console.log('FootnoteSection rendered:', { isFootnotes, className: props.className, props: Object.keys(props) })

  // Only handle the footnotes section
  if (isFootnotes) {
    // On mobile: show footnotes at bottom
    // On desktop: hide (but keep in DOM for extraction)
    return (
      <section
        data-footnotes
        className={isMobile ? 'footnotes-bottom' : 'footnotes-hidden'}
        {...props}
      >
        {children}
      </section>
    )
  }

  // For non-footnote sections, render normally
  return <section {...props}>{children}</section>
}
