import React from 'react';
import { Link } from 'react-router';

class BookmarkView extends React.Component {
  constructor() {
    super();
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
  }

  onSubmitEdit() {
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
    let textStyle = this.props.show ? { display: 'none' } : {};
    let inputStyle = this.props.show ? {} : { display: 'none' };
    let textDeleteStyle = this.props.delete ? { display: 'none' } : {};
    let deleteStyle = this.props.delete ? {} : { display: 'none' };

    return (
      <section className="bookmark-section">
        <div className="col-md-6" style={textStyle}>
          <h2>{this.props.bookmark[0].title}</h2>
          <h4>
            <a href={this.props.bookmark[0].url}>
              {this.props.bookmark[0].url}
            </a>
          </h4>
          <p>{this.props.bookmark[0].description}</p>
          <h4>Folder:</h4>
          <p>{this.props.bookmark[0].foldername}</p>
        </div>
        <div className="col-md-6" style={textStyle}>
          <img
            src={this.props.bookmark[0].screenshot}
            alt="placeholder"
            className="img-rounded"
            width="400"
          />
        </div>
        <div className="col-md-12" style={inputStyle}>
          <form onSubmit={this.onSubmitEdit}>
            <h4>Title *</h4>
            <input
              type="text"
              className="form-control"
              ref={title => { this.title = title; }}
              defaultValue={this.props.bookmark[0].title}
              placeholder="Title *" required
            />
            <h4>URL *</h4>
            <input
              type="text"
              className="form-control"
              ref={url => { this.url = url; }}
              defaultValue={this.props.bookmark[0].url}
              placeholder="URL *"
              required
            />
            <h4>Description</h4>
            <input
              type="text"
              className="form-control"
              ref={description => { this.description = description; }}
              defaultValue={this.props.bookmark[0].description}
              placeholder="Description"
            />
            <h4>Screenshot URL</h4>
            <input
              type="text"
              className="form-control"
              ref={screenshot => { this.screenshot = screenshot; }}
              defaultValue={this.props.bookmark[0].screenshot}
              placeholder="Screenshot URL"
            />
            <h4>Folder *</h4>
            <select
              className="selectpicker form-control"
              ref={folder => { this.folder = folder; }}
              id="form-folder"
              required
            >{this.props.folderArr}
            </select>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-default"
            style={textStyle}
            onClick={this.props.onShowEdit}
          >Edit
          </button>
          <button
            className="btn btn-default"
            style={inputStyle}
            onClick={this.props.onShowEdit}
          >Cancel
          </button>
          <button
            className="btn btn-default"
            style={textDeleteStyle}
            onClick={this.props.onShowDelete}
          >Delete
          </button>
          <Link to={'/'} style={deleteStyle}>
            <button
              className="btn btn-default"
              onClick={() => { this.props.onDelete(this.props.bookmark[0].bookmarkid); }}
            >Confirm
            </button>
          </Link>
          <Link to={'/'} style={textStyle}>
            <button className="btn btn-default">Close</button>
          </Link>
        </div>
      </section>
    );
  }
}

module.exports = BookmarkView;
