import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Folder from './folder';

class FolderManagement extends React.Component {
  constructor() {
    super();
    this.onShowEdit = this.onShowEdit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onShare = this.onShare.bind(this);
    this.state = {
      show: false,
    };
  }

  onShowEdit() {
    this.setState({
      show: !this.state.show,
    });
  }

  onEdit(folderId, folderName) {
    // TODO: dispatch action to rename folder
    console.log("In onEdit")
    this.props.dispatch(actions.editFolder(folderId, folderName, this.props.token));
    this.onShowEdit();
  }

  onDelete(folderId, token) {
    // TODO: dispatch action to remove folder
    console.log("in deleteFolder")
    this.props.dispatch(actions.deleteFolder(folderId, this.props.token))
  }

  onShare(folderId) {
    // TODO: dispatch action to share folder
  }

  render() {
    console.log(this.props, '<==== FOLDER CONTAINER PROPS');

    let folders = this.props.folders.map((folder, index) => {
      return (
        <Folder
          key={index}
          folder={folder}
          onEdit={this.onEdit}
          show={this.state.show}
          onShowEdit={this.onShowEdit}
          onDelete={this.onDelete}
          onShare={this.onShare}
          />
      );
    });

    return(
      <ul>
        {folders}
      </ul>
    )
  }
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,
    folders: state.folders,
  };
}

module.exports = connect(mapStateToProps)(FolderManagement);
