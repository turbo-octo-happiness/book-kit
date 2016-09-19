import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import NavFolder from './nav-folder';

class FolderContainer extends React.Component {
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
      <NavFolder
        show={this.state.show}
        onShowEdit={this.onShowEdit}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        folder={this.props.folder}
      />
    );
  }
}

const Container = connect()(FolderContainer);

module.exports = Container;
