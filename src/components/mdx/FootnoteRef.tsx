import { useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { useSidenotes } from './SidenotesContext'

interface FootnoteRefProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode
}

export function FootnoteRef({ children, id, href, ...props }: FootnoteRefProps) {
  const { registerRef } = useSidenotes()
  const ref = useRef<HTMLAnchorElement>(null)

  // Check for footnote ref by data attribute or id pattern
  const hasFootnoteRefAttr = 'data-footnote-ref' in props
  const isFootnoteRef = hasFootnoteRefAttr || id?.includes('fnref')

  console.log('FootnoteRef rendered:', { id, href, isFootnoteRef, hasFootnoteRefAttr, props: Object.keys(props) })

  useEffect(() => {
    if (isFootnoteRef && ref.current) {
      // Use id if available, otherwise generate one from href
      const refId = id || href?.replace('#', '').replace('-fn-', '-fnref-') || ''
      if (refId) {
        console.log('Registering footnote ref:', refId)
        registerRef(refId, ref.current)
      }
    }
  }, [id, href, isFootnoteRef, registerRef])

  if (isFootnoteRef) {
    return (
      <a
        ref={ref}
        id={id}
        href={href}
        className="footnote-ref"
        {...props}
      >
        {children}
      </a>
    )
  }

  // For non-footnote links, render normally
  return (
    <a id={id} href={href} {...props}>
      {children}
    </a>
  )
}
