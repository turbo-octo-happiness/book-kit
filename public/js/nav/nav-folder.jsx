import React from 'react';
import { Link } from 'react-router';

class Folder extends React.Component {
  render() {
    let textStyle = this.props.show ? { display: 'none' } : {};
    let inputStyle = this.props.show ? {} : { display: 'none' };
    return (
      <li>
        <Link to={`/folders/${this.props.folder.foldername}`} style={textStyle}>
          {this.props.folder.foldername}
        </Link>
        <form
          onSubmit={() => {
            this.props.onEdit(
              this.props.folder.folderid,
              this.editedFolder.value,
              event
            );
          }}
          style={inputStyle}
        >
          <input
            type="text"
            ref={editedFolder => { this.editedFolder = editedFolder; }}
            defaultValue={this.props.folder.foldername}
          />
        </form>
        <span
          onClick={this.props.onShowEdit}
          className="glyphicon glyphicon-pencil"
          aria-hidden="true"
        />
        <span
          onClick={() => { this.props.onDelete(this.props.folder.folderid); }}
          className="glyphicon glyphicon-trash"
          aria-hidden="true"
        />
      </li>
    );
  }
}

module.exports = Folder;
