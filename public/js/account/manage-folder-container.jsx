import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Folder from './manage-folder-child';

class FolderContainer extends React.Component {
  constructor() {
    super();
    this.deleteFolder = this.deleteFolder.bind(this);
    this.onShowEdit = this.onShowEdit.bind(this);
    this.onShowShare = this.onShowShare.bind(this);
    this.editFolder = this.editFolder.bind(this);
    this.state = {
      show: false,
      showShare: false,
    };
  }

  deleteFolder(folderId) {
    this.props.dispatch(actions.deleteFolder(folderId, this.props.token))
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

  render() {
    return (
      <Folder
        show={this.state.show}
        showShare={this.state.showShare}
        folder={this.props.folder}
        deleteFolder={this.deleteFolder}
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
