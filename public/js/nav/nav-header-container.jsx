import React from 'react';
import { connect } from 'react-redux';
import Navbar from './nav-header';
import actions from '../redux/actions';

class NavbarContainer extends React.Component {
  constructor() {
    super();
    this.addFolder = this.addFolder.bind(this);
    this.onAddInput = this.onAddInput.bind(this);
  }

  onAddInput(event) {
    const text = event.target.value;
    this.props.dispatch(actions.searchTextChange(text));
  }

  addFolder(folder) {
    this.props.dispatch(actions.addFolder(folder));
  }

  render() {
    return (
      <Navbar
        folders={this.props.folders}
        onAddInput={this.onAddInput}
        addFolder={this.addFolder}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    folders: state.folders,
  };
};

const Container = connect(mapStateToProps)(NavbarContainer);

module.exports = Container;
