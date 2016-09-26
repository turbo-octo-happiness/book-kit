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

  return (
    <header>
      {isAuthenticated ? (
        <nav className="navbar navbar-default">
          <div className="container">
            <ul className="nav navbar-nav">
              <li>
                <Link className="navbar-brand" to={'/main'}>
                  <img src="img/logo.png" alt="Book Kit!" />
                </Link>
              </li>
            </ul>
            <div className="navbar-form navbar-right">
              <img src={profile.picture} height="40px" alt="profile" />
              <button className="btn btn-primary">My Account</button>
              <Link to={'/'}>
                <button className="btn btn-primary" onClick={onLogoutClick}>Logout</button>
              </Link>
            </div>
          </div>
        </nav>

      ) : (

        <nav className="navbar navbar-default">
          <div className="container">
            <ul className="nav navbar-nav">
              <li>
                <Link className="navbar-brand" to={'/'}>
                  <img src="img/logo.png" alt="Book Kit!" />
                </Link>
              </li>
            </ul>
            <div className="navbar-form navbar-right">
              <button
                className="btn btn-primary"
                onClick={() => { lock.show(); }}
              >Login
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

Navbar.propTypes = propTypes;

module.exports = Navbar;
