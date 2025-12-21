import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

interface CodeExampleProps {
  code: string
  language?: string
}

export function CodeExample({ code, language = 'typescript' }: CodeExampleProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>('')

  useEffect(() => {
    codeToHtml(code.trim(), {
      lang: language,
      theme: 'github-dark',
    }).then(setHighlightedCode)
  }, [code, language])

  return (
    <div className="code-container">
      <div className="code-header">
        <span className="code-dot"></span>
        <span className="code-dot"></span>
        <span className="code-dot"></span>
        <span className="code-language">{language}</span>
      </div>
      {highlightedCode ? (
        <div
          className="code-block shiki-wrapper"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      ) : (
        <pre className="code-block">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
