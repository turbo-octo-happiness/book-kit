import React, { PropTypes } from 'react';
import Auth0Lock from 'auth0-lock';
import { Link } from 'react-router';
import { Navbar, Nav, Button } from 'react-bootstrap';

// TODO: PASS GETPROFILE() IN AS PROPS FROM NAV-HEADER-CONTAINER

// Renders 1 of 2 different headers depending on state of authentication

const SERVER_URL = window.location.origin;

const propTypes = {
  onLogoutClick: PropTypes.func,
  profile: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

function NavbarComponent(props) {
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
    <Nav pullRight="true">
      <img src={profile.picture} height="40px" alt="profile" />
      <Button>My Account</Button>
      <Link to={'/'}>
        <Button onClick={onLogoutClick}>Logout</Button>
      </Link>
    </Nav>
  ) : (
    <Nav pullRight="true">
      <Button
        onClick={() => { lock.show(); }}
      >Login
      </Button>
    </Nav>
  );

  return (
    <header>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/main">
              <img src="img/logo.png" alt="Book Kit!" />
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        {navContent}
      </Navbar>
    </header>
  );
}

NavbarComponent.propTypes = propTypes;

module.exports = NavbarComponent;
