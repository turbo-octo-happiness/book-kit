import React from 'react';
import Folder from './bookmark-form-folder';

class BookmarkForm extends React.Component {
  constructor() {
    super();
    this.addBookmark = this.addBookmark.bind(this);
  }

  addBookmark() {
    this.props.onAdd({
      url: this.url.value,
      title: this.title.value,
      description: this.description.value,
      folderid: this.folder.value,
      screenshot: this.screenshot.value,
    });

    this.url.value = '';
    this.title.value = '';
    this.description.value = '';
    this.folder.value = '';
    this.screenshot.value = '';
  }

  render() {
    let folderArr = [];
    this.props.folders.forEach((folder, index) => {
      folderArr.push(<Folder key={index} folder={folder} />);
    });

    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Enter a New Bookmark</h2>
          </div>
          <div className="modal-body">
            <form onSubmit={this.addBookmark} className="form-horizontal">
              <div className="form-group">
                <label htmlFor="form-title" className="col-sm-2 control-label">Title *</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    ref={title => { this.title = title; }}
                    className="form-control"
                    id="form-title"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="form-url" className="col-sm-2 control-label">URL *</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    ref={url => { this.url = url; }}
                    className="form-control"
                    id="form-url"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  htmlFor="form-description"
                  className="col-sm-2 control-label"
                >Description
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    ref={description => { this.description = description; }}
                    className="form-control"
                    id="form-description"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  htmlFor="form-screenshot"
                  className="col-sm-2 control-label"
                >Screenshot URL
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    ref={screenshot => { this.screenshot = screenshot; }}
                    className="form-control"
                    id="form-screenshot"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  htmlFor="form-folder"
                  className="col-sm-2 control-label"
                >Folder *
                </label>
                <div className="col-sm-10">
                  <select
                    ref={folder => { this.folder = folder; }}
                    className="selectpicker form-control"
                    id="form-folder"
                    required
                  >{folderArr}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-10 col-sm-push-2">
                  <input
                    type="submit"
                    className="btn btn-default"
                    id="form-submit"
                    value="Submit"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
            >Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = BookmarkForm;
