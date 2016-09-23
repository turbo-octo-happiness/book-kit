import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import actions from '../redux/actions';

const propTypes = {
  folders: PropTypes.array,
  dispatch: PropTypes.func,
};

class SidebarContainer extends React.Component {
  constructor() {
    super();
    this.onAddInput = this.onAddInput.bind(this);
  }

  onAddInput(event) {
    const text = event.target.value;
    this.props.dispatch(actions.searchTextChange(text));
  }

  render() {
    return (
      <Sidebar
        folders={this.props.folders}
        onAddInput={this.onAddInput}
      />
    );
  }
}

SidebarContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    folders: state.folders,
    // tags: state.tags,
  };
}

module.exports = connect(mapStateToProps)(SidebarContainer);
