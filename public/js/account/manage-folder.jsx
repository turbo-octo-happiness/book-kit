import React from 'react';
import { connect } from 'react-redux';
import FolderContainer from './manage-folder-container';

function ManageFolders(props) {
  const { folders } = props;
  const foldersArr = folders.map((folder, index) => {
    return (
      <FolderContainer
        key={index}
        folder={folder}
      />
    );
  });

  return (
    <ul className="content-section">
      <li>
        <h2 className="folder-header">
          Manage Folders:
        </h2>
      </li>
      {foldersArr}
    </ul>
  );
}

function mapStateToProps(state) {
  return {
    folders: state.folders,
  };
}

module.exports = connect(mapStateToProps)(ManageFolders);
