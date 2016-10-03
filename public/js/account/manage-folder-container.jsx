import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Folder from './manage-folder-child';

class FolderContainer extends React.Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    this.onShare = this.onShare.bind(this);
    this.onShowEdit = this.onShowEdit.bind(this);
    this.editFolder = this.editFolder.bind(this);
    this.state = {
      show: false,
    };
  }

  onDelete(folderId) {
    // TODO: Fix issue with folder not deleting in database
    this.props.dispatch(actions.deleteFolder(folderId, this.props.token))
  }

  onShare(folderId) {
    // TODO: dispatch action to share folder
  }

  onShowEdit() {
    this.setState({
      show: !this.state.show,
    });
  }

  editFolder(folderId, folderName) {
    this.props.dispatch(actions.editFolder(
      folderId,
      folderName,
      this.props.token
    ));
    this.onShowEdit();
  }

  render() {
    return (
      <Folder
        show={this.state.show}
        folder={this.props.folder}
        onDelete={this.onDelete}
        onShare={this.onShare}
        onShowEdit={this.onShowEdit}
        editFolder={this.editFolder}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

module.exports = connect(mapStateToProps)(FolderContainer);
