import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth0Lock from 'auth0-lock';
import { hashHistory } from 'react-router';
import { Link } from 'react-router';
import actions from '../redux/actions';
import BookmarkFormContainer from '../content/bookmark-form-container';

// TODO: PASS GETPROFILE() IN AS PROPS FROM NAV-HEADER-CONTAINER

class Navbar extends React.Component {

  getProfile(lock, authResult) {
    lock.getProfile(authResult.idToken, (err, profile) => {
      if (err) {
        this.props.dispatch(actions.loginError(err));
      }

      this.props.dispatch(actions.loginSuccess(authResult.idToken, profile));
      hashHistory.push('/main');
    });
  }

  render() {
    const lock = new Auth0Lock('6ElpyE9EazmBox2b9PAWytCnFJQTxBCa', 'ericsnell.auth0.com', {
      auth: {
        redirectUrl: 'http://localhost:5000/#/main',
        responseType: 'token',
        params: {
          scope: 'openid name identities picture',
        },
      },
    });

    lock.on('authenticated', (authResult) => {
      this.getProfile(lock, authResult);
    });

    const { onLogoutClick, profile, isAuthenticated } = this.props
    return (
      <header>
        {isAuthenticated ? (
          <nav className="navbar navbar-default">
            <div className="container">
              <ul className="nav navbar-nav">
                <li>
                  <Link className="navbar-brand" to={'/main'}>
                    <img src="logo.png" alt="Book Kit!"/>
                  </Link>
                </li>
                <li>
                  <a data-toggle="modal" data-target="#add-form">
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"/>
                  </a>
                  <div className="modal fade" id="add-form">
                    <BookmarkFormContainer/>
                  </div>
                </li>
              </ul>
              <div className="navbar-form navbar-right">
                <img src={profile.picture} height="40px"/>
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
                    <img src="logo.png" alt="Book Kit!"/>
                  </Link>
                </li>
              </ul>
              <div className="navbar-form navbar-right">
                <button className="btn btn-primary" onClick={() => {
                  lock.show();
                }}>Login</button>
              </div>
            </div>
          </nav>
        )}
      </header>
    )
  }
}

module.exports = connect()(Navbar);
