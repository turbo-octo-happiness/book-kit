import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  onEdit: PropTypes.func,
  bookmark: PropTypes.object,
  show: PropTypes.bool,
  deleted: PropTypes.bool,
  folderArr: PropTypes.array,
  onShowEdit: PropTypes.func,
  onShowDelete: PropTypes.func,
  onDelete: PropTypes.func,
  folders: PropTypes.array,
  owner: PropTypes.number,
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
      screenshot: this.screenshot.value,
      bookmarkid: this.props.bookmark.bookmarkid,
      folderid: this.folder.value,
      foldername: this.props.folders.filter((folder) => {
        if (this.folder.value === folder.folderid.toString()) {
          return folder.foldername;
        }
        return false;
      }),
      tags: this.tags.value.trim() !== '' ? this.tags.value.toLowerCase().split(',').map((tag) => {
        return tag.trim();
      }) : [],
    });
  }

  render() {
    const { show, deleted, bookmark, owner, folders, folderArr } = this.props;

    const textStyle = show ? { display: 'none' } : {};
    const inputStyle = show ? {} : { display: 'none' };
    const textDeleteStyle = deleted ? { display: 'none' } : {};
    const deleteStyle = deleted ? {} : { display: 'none' };
    const imgStyle = show ? {
      backgroundImage: `url(${bookmark.screenshot})`,
      display: 'none',
    } : {
      backgroundImage: `url(${bookmark.screenshot})`,
    };

    const disabled = owner.toString() !== bookmark.owner;

    const folder = folders.filter((folderObj) => {
      return bookmark.folderid === folderObj.folderid;
    });

    let tags;
    let tagsList;
    if (bookmark.tags && bookmark.tags[0] !== null) {
      tags = bookmark.tags.map((tagObj, index) => {
        return <li key={index}>{tagObj.tagname}</li>;
      });

      tagsList = bookmark.tags.map((tagObj) => {
        return tagObj.tagname;
      });
    }

    const httpCheck = /http/;
    const url = httpCheck.test(bookmark.url) ? bookmark.url : `//${bookmark.url}`;

    const sharedMarker = folder[0].members ? (
      <span className="shared-marker">Shared</span>
    ) : (
      <span />
    );

    return (
      <section className="content-section bookmark-section">
        <div className="bookmark-view" style={textStyle}>
          <div className="bookmark-header">
            <div className="bookmark-title">
              <h2>{bookmark.title}</h2>
              <h4>
                <a href={url} target="_blank">
                  {bookmark.url}
                </a>
              </h4>
            </div>
            <div className="bookmark-screenshot" style={imgStyle} />
          </div>

          <p>{bookmark.description}</p>
          <h4>Folder:</h4>
          <div className="view-folder">
            <p>{folder[0].foldername}</p>
            {sharedMarker}
          </div>

          <h4>Tags:</h4>
          <ul className="tags-list">{tags}</ul>

          <button
            style={textStyle}
            onClick={this.props.onShowEdit}
            disabled={disabled}
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
            disabled={disabled}
          >Delete
          </button>
          <Link to={'/main'} style={deleteStyle}>
            <button
              onClick={() => { this.props.onDelete(bookmark.bookmarkid); }}
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
          <form>
            <h4>Title *</h4>
            <input
              type="text"
              ref={title => { this.title = title; }}
              defaultValue={bookmark.title}
              placeholder="Title *" required
            />
            <h4>URL *</h4>
            <input
              type="text"
              ref={url => { this.url = url; }}
              defaultValue={bookmark.url}
              placeholder="URL *"
              required
            />
            <h4>Description</h4>
            <textarea
              className="edit-description"
              ref={description => { this.description = description; }}
              defaultValue={bookmark.description}
              placeholder="Description"
              rows="7"
            />
            <h4>Screenshot URL</h4>
            <input
              type="text"
              ref={screenshot => { this.screenshot = screenshot; }}
              defaultValue={bookmark.screenshot}
              placeholder="Screenshot URL"
            />
            <h4>Tags</h4>
            <input
              type="text"
              className="form-control"
              ref={tagsInput => { this.tags = tagsInput; }}
              defaultValue={tagsList}
            />
            <h4>Folder *</h4>
            <select
              ref={folderInput => { this.folder = folderInput; }}
              required
            >{folderArr}
            </select><br />
            <button onClick={this.onSubmitEdit} type="submit">Submit</button>
            <button onClick={() => { this.props.onShowEdit(); }}>Cancel</button>
          </form>
        </div>
      </section>
    );
  }
}

BookmarkView.propTypes = propTypes;

module.exports = BookmarkView;
