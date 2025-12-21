interface CodeExampleProps {
  code: string
  language?: string
}

export function CodeExample({ code, language = 'typescript' }: CodeExampleProps) {
  return (
    <div className="code-container">
      <div className="code-header">
        <span className="code-dot"></span>
        <span className="code-dot"></span>
        <span className="code-dot"></span>
        <span className="code-language">{language}</span>
      </div>
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    </div>
  )
}
