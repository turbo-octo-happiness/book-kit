import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Folder from './folder';

class FolderManagement extends React.Component {
  constructor() {
    super();
    this.renameFolder = this.renameFolder.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
    this.shareFolder = this.shareFolder.bind(this);
  }

  renameFolder(folderId, folderName, token) {
    // TODO: dispatch action to rename folder
  }

  deleteFolder(folderId, token) {
    // TODO: dispatch action to remove folder
  }

  shareFolder(folder, token) {
    // TODO: dispatch action to share folder
  }

  render() {
    console.log(this.props, '<==== FOLDER CONTAINER PROPS');

    let folders = this.props.folders.map((folder, index) => {
      return (
        <Folder
          key={index}
          folder={folder}
          renameFolder={this.renameFolder}
          deleteFolder={this.deleteFolder}
          shareFolder={this.shareFolder}
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
