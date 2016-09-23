import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth0Lock from 'auth0-lock';
import { hashHistory } from 'react-router';
import { Link } from 'react-router';
import actions from '../redux/actions';
import BookmarkFormContainer from '../content/bookmark-form-container';


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
    let logButton;
    if (isAuthenticated) {
      logButton = (
        <div className="navbar-form navbar-right">
          <img src={profile.picture} height="40px" />
          <Link to={'/'} >
            <button className="btn btn-primary" onClick={onLogoutClick}>Logout</button>
          </Link>
        </div>
      )
    } else {
      logButton = (
        <div className="navbar-form navbar-right">
          <button className="btn btn-primary" onClick={() => { lock.show(); }}>Login</button>
        </div>
      )
    }

    return (
      <header>
        <nav className="navbar navbar-default">
          <div className="container">
            <ul className="nav navbar-nav">
              <li>
                <Link className="navbar-brand" to={'/'}>
                  <img src="logo.png" alt="Book Kit!" />
                </Link>
              </li>
              <li>
                <a data-toggle="modal" data-target="#add-form">
                  <span className="glyphicon glyphicon-plus" aria-hidden="true" />
                </a>

                <div className="modal fade" id="add-form">
                  <BookmarkFormContainer />
                </div>
              </li>
            </ul>
            {logButton}
          </div>
        </nav>
      </header>
    );
  }
}

module.exports = connect()(Navbar);
