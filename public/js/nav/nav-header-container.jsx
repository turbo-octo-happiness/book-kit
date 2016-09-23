import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from './nav-header';
import { logout } from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
};


class NavbarContainer extends React.Component {
  constructor() {
    super();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    this.props.logout()
  }

  render() {
    return (
      <Navbar
        onLogoutClick={this.handleLogoutClick}
        isAuthenticated={this.props.isAuthenticated}
        profile={this.props.profile}
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

module.exports = connect(mapStateToProps, {
  logout,
})(NavbarContainer);
