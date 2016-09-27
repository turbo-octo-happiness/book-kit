import React, { PropTypes } from 'react';
import Auth0Lock from 'auth0-lock';
import { Link } from 'react-router';

// TODO: PASS GETPROFILE() IN AS PROPS FROM NAV-HEADER-CONTAINER

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
        scope: 'openid name identities picture',
      },
    },
  });

  lock.on('authenticated', (authResult) => {
    props.getProfile(lock, authResult);
  });

  const { onLogoutClick, profile, isAuthenticated } = props;
  const navContent = isAuthenticated ? (
    <div className="logout">
      <img src={profile.picture} height="40px" alt="profile" className="prof-pic" />
      <Link to="/manage/profile">My Account</Link>
      <Link to="/" onClick={onLogoutClick}>
        Logout
      </Link>
    </div>
  ) : (
    <div className="login">
      <Link to="#" onClick={() => { lock.show(); }}>
        Login
      </Link>
    </div>
  );

  return (
    <header>
      <nav>
        <Link to="/main" className="main-logo">
          <img src="img/logo.png" alt="Book Kit!" />
        </Link>
        {navContent}
      </nav>
    </header>
  );
}

Navbar.propTypes = propTypes;

module.exports = Navbar;
