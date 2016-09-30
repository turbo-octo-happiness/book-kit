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
  folders: PropTypes.array,
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
      tags: this.tags.value.trim() !== '' ? this.tags.value.toLowerCase().split(',').map((tag) => {
        return tag.trim();
      }) : [],
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
    const imgStyle = this.props.show ? {
      backgroundImage: `url(${this.props.bookmark[0].screenshot})`,
      display: 'none',
    } : {
      backgroundImage: `url(${this.props.bookmark[0].screenshot})`,
    };

    const folder = this.props.folders.filter((folderObj) => {
      // console.log(this.props.bookmark, '<=== bookmark');
      // console.log(folderObj, '<=== folder');
      return this.props.bookmark[0].folderid === folderObj.folderid;
    });

    let tags;
    if (this.props.bookmark[0].tags && this.props.bookmark[0].tags[0] !== null) {
      tags = this.props.bookmark[0].tags.map((tagObj) => {
        return tagObj.tagname;
      });
    }

    return (
      <section className="content-section bookmark-section">
        <div className="bookmark-view" style={textStyle}>
          <div className="bookmark-header">
            <div className="bookmark-title">
              <h2>{this.props.bookmark[0].title}</h2>
              <h4>
                <a href={this.props.bookmark[0].url}>
                  {this.props.bookmark[0].url}
                </a>
              </h4>
            </div>
            <div className="bookmark-screenshot" style={imgStyle}>
            </div>
          </div>


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
          <Link to={'/main'} style={deleteStyle}>
            <button
              onClick={() => { this.props.onDelete(this.props.bookmark[0].bookmarkid); }}
            >Confirm
            </button>
          </Link>
          <button
            style={deleteStyle}
            onClick={this.props.onShowDelete}
          >Cancel
          </button>
          <Link to={'/main'} style={textDeleteStyle}>
            <button>Close</button>
          </Link>
        </div>

        <div className="bookmark-edit" style={inputStyle}>
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
            <textarea
              className="edit-description"
              ref={description => { this.description = description; }}
              defaultValue={this.props.bookmark[0].description}
              placeholder="Description"
              rows="7"
            />
            <h4>Screenshot URL</h4>
            <input
              type="text"
              ref={screenshot => { this.screenshot = screenshot; }}
              defaultValue={this.props.bookmark[0].screenshot}
              placeholder="Screenshot URL"
            />
          <h4>Tags</h4>
            <input
              type="text"
              className="form-control"
              ref={tags => { this.tags = tags; }}
              defaultValue={tags}
            />
            <h4>Folder *</h4>
            <select
              ref={folder => { this.folder = folder; }}
              required
            >{this.props.folderArr}
            </select><br />
            <button type="submit">Submit</button>
            <button onClick={() => this.props.onShowEdit}>Cancel</button>
          </form>
        </div>
      </section>
    );
  }
}

BookmarkView.propTypes = propTypes;

module.exports = BookmarkView;
