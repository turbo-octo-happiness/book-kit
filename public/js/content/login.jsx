import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth0Lock from 'auth0-lock';
import actions from '../redux/actions';


class Auth extends Component {
  constructor(props) {
    super(props);
  }

  getProfile(lock, authResult) {
    lock.getProfile(authResult.idToken, (err, profile) => {
      if (err) {
        this.props.dispatch(actions.loginError(err));
      }

      this.props.dispatch(actions.loginSuccess(authResult.idToken, profile));
    });
  }

  render() {
    const lock = new Auth0Lock('xWRBy48msvTCg2kLsTrRWBBRXrC7hc4I', 'robbykim.auth0.com', {
      auth: {
        redirectUrl: 'http://localhost:5000/#/main',
        responseType: 'token',
        params: {
          scope: 'openid profile',
        },
      },
    });

    lock.on('authenticated', (authResult) => {
      this.getProfile(lock, authResult);
    });

    const { onLoginClick, onLogoutClick, isAuthenticated, profile } = this.props
    return (
      <div style={{ marginTop: '10px' }}>
        { !isAuthenticated ? (
          <ul className="list-inline">
            <li><button className="btn btn-primary" onClick={() => { lock.show(); }}>Login</button></li>
          </ul>
        ) : (
          <ul className="list-inline">
            <li><img src={profile.picture} height="40px" /></li>
            <li><span>Welcome, {profile.nickname}</span></li>
            <li><button className="btn btn-primary" onClick={onLogoutClick}>Logout</button></li>
          </ul>
        )}
      </div>
    );
  }
}

module.exports = connect()(Auth);
