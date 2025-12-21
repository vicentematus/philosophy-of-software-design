import type { ReactNode } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { SidenotesProvider, Sidenotes, FootnoteSection, useSidenotes } from './mdx'
import { YouTubeProvider, YouTubePlayer, TimestampLink, TimestampBlock } from './video'
import * as EssayComponents from './essay'

// Video ID for "A Philosophy of Software Design" talk
const VIDEO_ID = 'bmSAYlu0NcY'

// MDX components that override default HTML elements
const mdxComponents = {
  // Override section to handle footnotes section visibility
  section: FootnoteSection,
  // Video timestamp components
  TimestampLink,
  TimestampBlock,
  // Custom essay components
  ...EssayComponents,
}

interface EssayLayoutProps {
  children: ReactNode
}

function EssayContent({ children }: EssayLayoutProps) {
  const { containerRef } = useSidenotes()

  return (
    <div className="essay-page">
      <YouTubePlayer />
      <div className="essay-layout" ref={containerRef}>
        <article className="essay-content">
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </article>
        <Sidenotes />
      </div>
    </div>
  )
}

export function EssayLayout({ children }: EssayLayoutProps) {
  return (
    <YouTubeProvider videoId={VIDEO_ID}>
      <SidenotesProvider>
        <EssayContent>{children}</EssayContent>
      </SidenotesProvider>
    </YouTubeProvider>
  )
}
