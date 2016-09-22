import React, { Component, PropTypes } from 'react';

class Auth extends Component {
  render() {
    const { onLoginClick, isAuthenticated, profile } = this.props
    let login;
    if (!isAuthenticated) {
      login = (
        <button className="btn btn-primary" onClick={onLoginClick}>Login</button>
      )
    }

    return (
      <div>
        {login}
      </div>
    );
  }
}

export default Auth;
