import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Navbar from './nav-header';
import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
};

class NavbarContainer extends React.Component {
  constructor() {
    super();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  getProfile(lock, authResult) {
    lock.getProfile(authResult.idToken, (err, profile) => {
      if (err) {
        this.props.dispatch(actions.loginError(err));
      }

      this.props.dispatch(actions.loginSuccess(authResult.idToken, profile));
      this.props.dispatch(actions.getFolders(authResult.idToken));
      this.props.dispatch(actions.getBookmarks(authResult.idToken));

      hashHistory.push('/main');
    });
  }

  handleLogoutClick() {
    this.props.dispatch(actions.logout());
  }

  render() {
    return (
      <Navbar
        onLogoutClick={this.handleLogoutClick}
        isAuthenticated={this.props.isAuthenticated}
        profile={this.props.profile}
        getProfile={this.getProfile}
      />
    );
  }
}

NavbarContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.profile,
  };
}

module.exports = connect(mapStateToProps)(NavbarContainer);
