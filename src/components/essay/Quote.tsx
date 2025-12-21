interface QuoteProps {
  text: string
  author: string
  source?: string
}

export function Quote({ text, author, source }: QuoteProps) {
  return (
    <blockquote className="quote">
      <p className="quote-text">"{text}"</p>
      <footer className="quote-footer">
        — {author}
        {source && <cite>, {source}</cite>}
      </footer>
    </blockquote>
  )
}
