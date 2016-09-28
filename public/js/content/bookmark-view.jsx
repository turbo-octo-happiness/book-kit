import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  onEdit: PropTypes.func,
  bookmark: PropTypes.array,
  show: PropTypes.bool,
  delete: PropTypes.bool,
  folderArr: PropTypes.array,
  onShowEdit: PropTypes.func,
  onShowDelete: PropTypes.func,
  onDelete: PropTypes.func,
};

class BookmarkView extends React.Component {
  constructor() {
    super();
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
  }

  onSubmitEdit(event) {
    event.preventDefault();
    this.props.onEdit({
      url: this.url.value,
      title: this.title.value,
      description: this.description.value,
      folderid: this.folder.value,
      screenshot: this.screenshot.value,
      bookmarkid: this.props.bookmark[0].bookmarkid,
    });
  }

  render() {
    const textStyle = this.props.show ? { display: 'none' } : {};
    const inputStyle = this.props.show ? {} : { display: 'none' };
    const textDeleteStyle = this.props.delete ? { display: 'none' } : {};
    const deleteStyle = this.props.delete ? {} : { display: 'none' };

    const folder = this.props.folders.filter((folderObj) => {
      return this.props.bookmark[0].folderid === folderObj.folderid;
    });

    return (
      <section className="bookmark-section">
        <div className="bookmark-view" style={textStyle}>
          <h2>{this.props.bookmark[0].title}</h2>
          <h4>
            <a href={this.props.bookmark[0].url}>
              {this.props.bookmark[0].url}
            </a>
          </h4>
          <p>{this.props.bookmark[0].description}</p>
          <h4>Folder:</h4>
          <p>{folder[0].foldername}</p>

          <button
            style={textStyle}
            onClick={this.props.onShowEdit}
          >Edit
          </button>
          <button
            style={inputStyle}
            onClick={this.props.onShowEdit}
          >Cancel
          </button>
          <button
            style={textDeleteStyle}
            onClick={this.props.onShowDelete}
          >Delete
          </button>
          <Link to={'/'} style={deleteStyle}>
            <button
              onClick={() => { this.props.onDelete(this.props.bookmark[0].bookmarkid); }}
            >Confirm
            </button>
          </Link>
          <Link to={'/main'} style={textStyle}>
            <button>Close</button>
          </Link>
        </div>
        <div style={textStyle}>
          <img
            src={this.props.bookmark[0].screenshot}
            alt="placeholder"
            width="400"
          />
        </div>


        <div style={inputStyle}>
          <form onSubmit={this.onSubmitEdit}>
            <h4>Title *</h4>
            <input
              type="text"
              ref={title => { this.title = title; }}
              defaultValue={this.props.bookmark[0].title}
              placeholder="Title *" required
            />
            <h4>URL *</h4>
            <input
              type="text"
              ref={url => { this.url = url; }}
              defaultValue={this.props.bookmark[0].url}
              placeholder="URL *"
              required
            />
            <h4>Description</h4>
            <input
              type="text"
              ref={description => { this.description = description; }}
              defaultValue={this.props.bookmark[0].description}
              placeholder="Description"
            />
            <h4>Screenshot URL</h4>
            <input
              type="text"
              ref={screenshot => { this.screenshot = screenshot; }}
              defaultValue={this.props.bookmark[0].screenshot}
              placeholder="Screenshot URL"
            />
            <h4>Folder *</h4>
            <select
              ref={folder => { this.folder = folder; }}
              required
            >{this.props.folderArr}
            </select>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </section>
    );
  }
}

BookmarkView.propTypes = propTypes;

module.exports = BookmarkView;
