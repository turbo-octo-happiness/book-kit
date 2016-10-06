import React from 'react';

export default function SplashPage() {
  return (
    <div className="splash-page">
      <section className="splash-main">
        <div className="splash-head-text">
          <span className="main-tagline">Coding is hard.</span>
          <span className="main-tagline">Bookmarking shouldn't be.</span>
          <span className="second-tagline">Made by bootcamp students for bootcamp students.</span>
        </div>
      </section>
      <a href="#features" className="splash-btn">
        <span className="learn-more">Learn More</span>
        <span className="splash-scroll-btn">
          <i className="fa fa-caret-down" aria-hidden="true" />
        </span>
      </a>
      <section className="splash-features" id="features">

      </section>
      <footer className="splash-footer"></footer>
    </div>
  );
}
