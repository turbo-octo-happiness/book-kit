import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from './nav-header';
import { logout } from '../redux/actions';
// import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
  folders: PropTypes.array,
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
      />
    );
  }
}

NavbarContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    folders: state.folders,
  };
};

export default connect(mapStateToProps, {
  logout,
})(NavbarContainer);
