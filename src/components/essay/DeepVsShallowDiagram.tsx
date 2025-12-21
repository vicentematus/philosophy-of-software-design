export function DeepVsShallowDiagram() {
  return (
    <div className="diagram-container">
      <div className="diagram-title">Deep vs Shallow Classes</div>
      <div className="diagram-row">
        {/* Deep Class */}
        <div className="class-box">
          <div className="class-interface class-interface--small">
            Small Interface
          </div>
          <div className="class-implementation class-implementation--large">
            Large Implementation
            <div className="hidden-complexity">(hides complexity)</div>
          </div>
          <div className="class-label class-label--good">Deep Class</div>
        </div>

        {/* Shallow Class */}
        <div className="class-box">
          <div className="class-interface class-interface--large">
            Large Interface
          </div>
          <div className="class-implementation class-implementation--small">
            Small Implementation
          </div>
          <div className="class-label class-label--bad">Shallow Class</div>
        </div>
      </div>
    </div>
  )
}
