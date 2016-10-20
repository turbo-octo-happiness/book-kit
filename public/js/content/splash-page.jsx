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
      <section className="splash-features" id="features">
        <div className="feature-container">
          <h1>Organize all of your bookmarks</h1>
          <div className="features">
            <div className="features-child">
              <i className="fa fa-folder fa-2x" aria-hidden="true" />
              <span>Organize your bookmarks into customizable folders and access them easily with folder filtering</span>
            </div>

            <div className="features-child">
              <i className="fa fa-tags fa-2x" aria-hidden="true" />
              <span>Add re-usable tags to your bookmarks to link resources in different folders</span>
            </div>

            <div className="features-child">
              <i className="fa fa-search fa-2x" aria-hidden="true" />
              <span>Sift through your bookmarks instantly with real-time searching</span>
            </div>
          </div>
          <div className="features">
          <div className="features-child">
            <i className="fa fa-share-alt fa-2x" aria-hidden="true" />
            <span>Share folders with other users to maintain a collective library of resources for your co-hort</span>
          </div>

          <div className="features-child">
            <i className="fa fa-picture-o fa-2x" aria-hidden="true" />
            <span>Upload screenshots with your bookmarks to have a visual for your resource</span>
          </div>

          <div className="features-child">
            <i className="fa fa-laptop fa-2x" aria-hidden="true" />
            <span>Book Kit is open source and our source code is public for users to contribute to</span>
          </div>
          </div>
        </div>
      </section>
      <section className="splash-about" id="about">
        <div className="about-container">
          <div className="about">
            <div className="about-child">
              <div>
                <h2>Built by Bootcampers.</h2>
                <p>During our bootcamp experience, we needed a way to save and share our resources. Book Kit was built to cater to our bootcamp needs and yours as well.</p>
              </div>
              <img src="img/built.svg" alt="built by bootcampers" />
            </div>

            <div className="about-child">
              <img src="img/growth.svg" alt="growing content" />
              <div>
                <h2>Growing Content.</h2>
                <p>We are constantly growing our codebase to improve your experience. With so many bootcamps out there, we want to make a product that is viable and maintainable for our users.</p>
              </div>
            </div>

            <div className="about-child">
              <div>
                <h2>Help us, help you.</h2>
                <p>Book Kit is open source. We encourage you to help improve your favorite bookmarking tool and grow in your coding skills as well. Find us on <a href="https://github.com/turbo-octo-happiness/book-kit/">Github</a>.</p>
              </div>
              <img src="img/handshake.svg" alt="handshake" />
            </div>
          </div>
        </div>
      </section>
      <footer className="splash-footer">
        <div className="footer-container">
          <img src="img/book-kit-logo.svg" alt="main-logo" />
          <a href="https://github.com/turbo-octo-happiness/book-kit">Github</a>
        </div>
      </footer>
    </div>
  );
}
