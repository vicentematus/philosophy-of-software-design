export function ClassCostBenefitDiagram() {
  return (
    <div className="diagram-container">
      <div className="cost-benefit-diagram">
        {/* Top annotation - Interface (cost) */}
        <div className="cost-benefit-annotation cost-benefit-annotation--top">
          <span className="cost-benefit-label">
            Interface: everything that must
            <br />
            be known to users (cost)
          </span>
          <svg className="cost-benefit-arrow cost-benefit-arrow--down" viewBox="0 0 24 40" fill="none">
            <path d="M12 0 L12 32 M6 26 L12 32 L18 26" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Main class visualization */}
        <div className="cost-benefit-main">
          {/* Curly brace on the left */}
          <div className="cost-benefit-brace-container">
            <svg className="cost-benefit-brace" viewBox="0 0 20 100" fill="none">
              <path
                d="M18 2 Q10 2 10 15 L10 42 Q10 50 2 50 Q10 50 10 58 L10 85 Q10 98 18 98"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <span className="cost-benefit-brace-label">Class</span>
          </div>

          {/* The class box */}
          <div className="cost-benefit-class">
            <div className="cost-benefit-interface"></div>
            <div className="cost-benefit-implementation"></div>
          </div>
        </div>

        {/* Bottom annotation - Functionality (benefit) */}
        <div className="cost-benefit-annotation cost-benefit-annotation--bottom">
          <svg className="cost-benefit-arrow cost-benefit-arrow--up" viewBox="0 0 24 40" fill="none">
            <path d="M12 40 L12 8 M6 14 L12 8 L18 14" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="cost-benefit-label">
            Useful functionality provided
            <br />
            by class (benefit)
          </span>
        </div>
      </div>
    </div>
  )
}
