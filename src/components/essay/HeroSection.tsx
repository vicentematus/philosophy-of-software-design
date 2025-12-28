import { ChaosTumbleweed } from "./ChaosTumbleweed";

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          A Philosophy of{" "}
          <span className="hero-title-accent">Software Design</span>
        </h1>
        <p className="hero-subtitle">Software is all about complexity.</p>
        <div className="hero-animation">
          <ChaosTumbleweed />
        </div>
      </div>
      <button
        className="hero-scroll-indicator"
        onClick={scrollToContent}
        aria-label="Scroll to content"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </section>
  );
}
