import type { ReactNode } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { SidenotesProvider, Sidenotes, FootnoteSection, useSidenotes } from './mdx'
import * as EssayComponents from './essay'

// MDX components that override default HTML elements
const mdxComponents = {
  // Override section to handle footnotes section visibility
  section: FootnoteSection,
  // Custom essay components
  ...EssayComponents,
}

interface EssayLayoutProps {
  children: ReactNode
}

function EssayContent({ children }: EssayLayoutProps) {
  const { containerRef } = useSidenotes()

  return (
    <div className="essay-layout" ref={containerRef}>
      <article className="essay-content">
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </article>
      <Sidenotes />
    </div>
  )
}

export function EssayLayout({ children }: EssayLayoutProps) {
  return (
    <SidenotesProvider>
      <EssayContent>{children}</EssayContent>
    </SidenotesProvider>
  )
}
