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
        <div className="feature-container">
          <h1>Organize all of your bookmarks</h1>
          <div className="features">
            <div className="features-child">
              <i className="fa fa-folder fa-2x" aria-hidden="true" />
              <span>Organize your bookmarks into customizable folders and access the easily with folder filtering</span>
            </div>

            <div className="features-child">
              <i className="fa fa-tags fa-2x" aria-hidden="true" />
              <span>Add re-usable tags to your bookmarks to link resources in different folders</span>
            </div>

            <div className="features-child">
              <i className="fa fa-search fa-2x" aria-hidden="true" />
              <span>Sift through your bookmarks to find what you're looking for instantly with real-time searching</span>
            </div>
          </div>
          <div className="features">
          <div className="features-child">
            <i className="fa fa-share-alt fa-2x" aria-hidden="true" />
            <span>Share folders with other users to maintain a collective library of resources for your co-hort</span>
          </div>

          <div className="features-child">
            <i className="fa fa-picture-o fa-2x" aria-hidden="true" />
            <span>Upload screenshots with your bookmarks to visually remember the resource you saved</span>
          </div>

          <div className="features-child">
            <i className="fa fa-laptop fa-2x" aria-hidden="true" />
            <span>Book Kit is open sourced and the source code is public and open for users to contribute to</span>
          </div>
          </div>
        </div>
      </section>
      <footer className="splash-footer"></footer>
    </div>
  );
}
