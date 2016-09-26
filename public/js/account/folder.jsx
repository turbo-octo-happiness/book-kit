import React from 'react';

class Folder extends React.Component {
  constructor() {
    super();
    this.editFolder = this.editFolder.bind(this);
  }

  editFolder(event) {
    event.preventDefault();
    console.log('in editFolder')
    this.props.onEdit(this.props.folder.folderid, this.editedFolder.value);
  }

  render() {
    const textStyle = this.props.show ? { display: 'none' } : {};
    const inputStyle = this.props.show ? {} : { display: 'none' };
    return(
      <div>
        <li>
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
          <button
            onClick={this.props.onShowEdit}
            aria-hidden="true"
            >Edit
          </button>
          <button
            onClick={this.props.onDelete}
            >Delete
          </button>
          <button
            onClick={this.props.onShare}
            >Share
          </button>
        </li>
      </div>
    )
  }
}

module.exports = Folder;
