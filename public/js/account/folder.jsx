import React from 'react';

class Folder extends React.Component {
  render() {
    console.log(this.props, '<=== Folder Props')
    return(
      <div>
        <li>
          <h3>{this.props.folder.foldername}</h3>
          <button onClick={this.props.renameFolder}>Edit</button>
          <button onClick={this.props.deleteFolder}>Delete</button>
          <button onClick={this.props.shareFolder}>Share</button>
        </li>
      </div>
    )
  }
}

module.exports = Folder;
