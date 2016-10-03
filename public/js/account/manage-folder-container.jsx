import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Folder from './manage-folder-child';

class FolderContainer extends React.Component {
  constructor() {
    super();
    this.onShowEdit = this.onShowEdit.bind(this);
    this.onShowShare = this.onShowShare.bind(this);
    this.editFolder = this.editFolder.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
    this.shareFolder = this.shareFolder.bind(this);
    this.state = {
      show: false,
      showShare: false,
    };
  }

  onShowShare() {
    // TODO: dispatch action to share folder
    this.setState({
      showShare: !this.state.showShare,
    });
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

  deleteFolder(folderId) {
    this.props.dispatch(actions.deleteFolder(folderId, this.props.token));
  }

  shareFolder(folderId, email) {
    this.props.dispatch(actions.shareFolder(folderId, email, this.props.token));
  }

  render() {
    return (
      <Folder
        show={this.state.show}
        showShare={this.state.showShare}
        folder={this.props.folder}
        deleteFolder={this.deleteFolder}
        shareFolder={this.shareFolder}
        onShowShare={this.onShowShare}
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
