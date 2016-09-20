import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from './nav-header';
import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
  folders: PropTypes.array,
};

class NavbarContainer extends React.Component {
  constructor() {
    super();
    this.onAddInput = this.onAddInput.bind(this);
  }

  onAddInput(event) {
    const text = event.target.value;
    this.props.dispatch(actions.searchTextChange(text));
  }

  // addFolder(folder) {
  //   this.props.dispatch(actions.addFolder(folder));
  // }

  render() {
    return (
      <Navbar onAddInput={this.onAddInput} />
    );
  }
}

NavbarContainer.propTypes = propTypes;

const Container = connect()(NavbarContainer);

module.exports = Container;
