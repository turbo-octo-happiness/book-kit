import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
  folders: PropTypes.object,
};

class SidebarContainer extends React.Component {
  constructor() {
    super();
    this.onShowEdit = this.onShowEdit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      show: false,
    };
  }

  onDelete(id) {
    // FIXME: issue when deleting a folder that is being used by a bookmark
    // it doesn't fail gracefully. should warn the user
    this.props.dispatch(actions.deleteFolder(id));
  }

  onEdit(id, folderName, event) {
    event.preventDefault();
    this.props.dispatch(actions.editFolder(id, folderName));
    this.onShowEdit();
  }

  onShowEdit() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <Sidebar
        show={this.state.show}
        onShowEdit={this.onShowEdit}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        folders={this.props.folders}
      />
    );
  }
}

SidebarContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    folders: state.folders,
  };
};

const Container = connect(mapStateToProps)(SidebarContainer);

module.exports = Container;
