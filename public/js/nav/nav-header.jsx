import React, { PropTypes } from 'react';
import Auth0Lock from 'auth0-lock';
import { Link } from 'react-router';

// Renders 1 of 2 different headers depending on state of authentication

const SERVER_URL = window.location.origin;

const propTypes = {
  onLogoutClick: PropTypes.func,
  profile: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

function Navbar(props) {
  const lock = new Auth0Lock('6ElpyE9EazmBox2b9PAWytCnFJQTxBCa', 'ericsnell.auth0.com', {
    auth: {
      redirectUrl: `${SERVER_URL}/#/main`,
      responseType: 'token',
      params: {
        scope: 'openid name email identities picture',
      },
    },

    theme: {
      logo: 'img/auth0-logo.png',
      primaryColor: '#23CE6B',

    },

    languageDictionary: {
      emailInputPlaceholder: 'something@youremail.com',
      title: 'Log me in',
    },
  });

  lock.on('authenticated', (authResult) => {
    props.getProfile(lock, authResult);
  });

  const { onLogoutClick, profile, isAuthenticated } = props;
  const navContent = isAuthenticated ? (
    <div className="logout">
      <Link to="/manage/profile" className="prof-link">
        <img src={profile.picture} height="40px" alt="profile" className="prof-pic" />
      </Link>
      <Link to="/manage/profile">My Account</Link>
      <a href="https://github.com/turbo-octo-happiness/book-kit/#how-to">Help</a>
      <Link to="/" onClick={onLogoutClick}>
        Logout
      </Link>
    </div>
  ) : (
    <div className="login">
      <Link to="#" onClick={() => { lock.show(); }}>
        Login
      </Link>
      <a href="https://github.com/turbo-octo-happiness/book-kit/#how-to">
        Help
      </a>
    </div>
  );

  return (
    <header>
      <nav>
        <Link to="/main" className="main-logo">
          <img src="img/book-kit-logo.svg" alt="Book Kit!" />
        </Link>
        {navContent}
      </nav>
    </header>
  );
}

Navbar.propTypes = propTypes;

module.exports = Navbar;
