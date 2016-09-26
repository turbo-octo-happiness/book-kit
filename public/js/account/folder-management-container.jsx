import React from 'react';
import { connect } from 'react-redux';
import Folder from './folder-management';

class FolderManagementContainer extends React.Component {
  constructor() {
    super();

  }


  render() {

    return(

    )
  }
}

function mapStateToProps(state) {
  return {
    // TODO: folder state
  };
}

module.exports = connect(mapStateToProps)(FolderManagementContainer);
