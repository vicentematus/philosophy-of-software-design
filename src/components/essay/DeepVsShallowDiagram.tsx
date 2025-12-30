export function DeepVsShallowDiagram() {
  return (
    <div className="diagram-container">
      <div className="diagram-title">Deep vs Shallow Modules</div>
      <div className="diagram-row">
        {/* Deep Module */}
        <div className="module-box module-box--deep">
          <div className="module-label-top">small interface</div>
          <div className="module-interface" />
          <div className="module-implementation module-implementation--tall">
            <span>big<br />implementation</span>
          </div>
          <div className="class-label class-label--good">Deep Modules</div>
        </div>

        {/* Shallow Module */}
        <div className="module-box module-box--shallow">
          <div className="module-label-top">big interface</div>
          <div className="module-interface" />
          <div className="module-implementation module-implementation--short">
            <span>small implementation</span>
          </div>
          <div className="class-label class-label--bad">Shallow Modules</div>
        </div>
      </div>
    </div>
  )
}
