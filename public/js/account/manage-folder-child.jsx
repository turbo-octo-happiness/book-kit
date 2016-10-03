import React from 'react';

class Folder extends React.Component {
  constructor() {
    super();
    this.onShowEdit = this.onShowEdit.bind(this);
    this.editFolder = this.editFolder.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
  }

  onShowEdit() {
    this.props.onShowEdit();
  }

  editFolder() {
    event.preventDefault();
    this.props.editFolder(
      this.props.folder.folderid,
      this.editedFolder.value
    );
  }

  deleteFolder() {
    this.props.onDelete(this.props.folder.folderid);
  }

  render() {
    const textStyle = this.props.show ? { display: 'none' } : {};
    const inputStyle = this.props.show ? {} : { display: 'none' };
    return (
      <li className="manage-folder">
        <h3 style={textStyle}>{this.props.folder.foldername}</h3>
        <form
          onSubmit={this.editFolder}
          style={inputStyle}
        >
          <input
            type="text"
            ref={editedFolder => { this.editedFolder = editedFolder; }}
            defaultValue={this.props.folder.foldername}
          />
        </form>
        <div className="manage-buttons">
          <button
            onClick={this.onShowEdit}
            aria-hidden="true"
          >Edit
          </button>
          <button
            onClick={this.deleteFolder}
          >Delete
          </button>
          <button
            onClick={this.props.onShare}
          >Share
          </button>
        </div>
      </li>
    );
  }
}

module.exports = Folder;
