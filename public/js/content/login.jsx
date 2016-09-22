import React, { Component, PropTypes } from 'react';

export default class Auth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onLoginClick, isAuthenticated, profile } = this.props
    return (
      <div style={{ marginTop: '10px' }}>
        { !isAuthenticated ? (
          <ul className="list-inline">
            <li><button className="btn btn-primary" onClick={onLoginClick}>Login</button></li>
          </ul>
        ) : (
          <ul className="list-inline">
            <li><img src={profile.picture} height="40px" /></li>
            <li><span>Welcome, {profile.nickname}</span></li>
          </ul>
        )}
      </div>
    );
  }
}
