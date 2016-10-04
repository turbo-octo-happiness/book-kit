import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Folder from './bookmark-form-folder';

const propTypes = {
  onAdd: PropTypes.func,
  folders: PropTypes.array,
};

class BookmarkForm extends React.Component {
  constructor() {
    super();
    this.addBookmark = this.addBookmark.bind(this);
  }

  addBookmark(event) {
    event.preventDefault();
    this.props.onAdd({
      url: this.url.value,
      title: this.title.value,
      description: this.description.value,
      screenshot: this.screenshot.value,
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

    this.url.value = '';
    this.title.value = '';
    this.description.value = '';
    this.folder.value = '';
    this.screenshot.value = '';
    this.tags.value = '';
    window.location = '/#/main';
  }

  render() {
    const folderArr = [];
    this.props.folders.forEach((folder, index) => {
      folderArr.push(<Folder key={index} folder={folder} />);
    });
    return (
      <div className="content-section bookmark-form-container">
        <div className="bookmark-form">
          <h2>Enter a New Bookmark</h2>
          <form onSubmit={this.addBookmark}>
            <label htmlFor="form-title">Title *</label>
            <div>
              <input
                type="text"
                ref={title => { this.title = title; }}
                className="form-control"
                id="form-title"
                required
              />
            </div>
            <label htmlFor="form-url">URL *</label>
            <div>
              <input
                type="text"
                ref={url => { this.url = url; }}
                className="form-control"
                id="form-url"
                required
              />
            </div>
            <label htmlFor="form-description">
              Description
            </label>
            <div>
              <input
                type="text"
                ref={description => { this.description = description; }}
                className="form-control"
                id="form-description"
              />
            </div>
            <label htmlFor="form-screenshot">
              Screenshot URL
            </label>
            <div>
              <input
                type="text"
                ref={screenshot => { this.screenshot = screenshot; }}
                className="form-control"
                id="form-screenshot"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="form-tags"
                className="col-sm-2 control-label"
              >Tags
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  ref={tags => { this.tags = tags; }}
                  className="form-control"
                  id="form-tags"
                  placeholder="separate with comma"
                />
              </div>
            </div>
            <label htmlFor="form-folder">
              Folder *
            </label>
            <div>
              <select
                ref={folder => { this.folder = folder; }}
                id="form-folder"
                className="folder-dropdown"
                required
              >{folderArr}
              </select>
            </div>
            <div>
              <button type="submit">Submit</button>
              <Link to="/main">
                <button type="button">Close</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

BookmarkForm.propTypes = propTypes;

module.exports = BookmarkForm;
