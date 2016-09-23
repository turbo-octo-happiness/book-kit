import React from 'react';
import NavbarContainer from '../nav/nav-header-container';

// TODO: SET AS SPLASH PAGE

class Container extends React.Component {
  render() {
    return (
      <div>
        <NavbarContainer/>
        {this.props.children}
      </div>
    );
  }
}


module.exports = Container;
