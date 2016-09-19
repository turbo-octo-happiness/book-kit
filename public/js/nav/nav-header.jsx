import React from 'react';
import { Link } from 'react-router';
import Folder from './nav-folder-container';
import BookmarkFormContainer from '../content/bookmark-form-container';

class Navbar extends React.Component {
  constructor() {
    super();
    this.onAddFolder = this.onAddFolder.bind(this);
  }

  onAddFolder(event) {
    event.preventDefault();
    this.props.addFolder(this.newFolder.value);
    this.newFolder.value = '';
  }

  render() {
    let folderArr = [];
    this.props.folders.forEach((folder, index) => {
      folderArr.push(<Folder key={index} folder={folder} />);
    });

    return (
      <header>
        <nav className="navbar navbar-default">
          <div className="container">
            <ul className="nav navbar-nav">
              <li>
                <Link className="navbar-brand" to={'/'}>
                  <img src="logo.png" alt="Book Kit!" />
                </Link>
              </li>
              <li>
                <a data-toggle="modal" data-target="#add-form">
                  <span className="glyphicon glyphicon-plus" aria-hidden="true" />
                </a>

                <div className="modal fade" id="add-form">
                  <BookmarkFormContainer />
                </div>
              </li>
            </ul>
            <form className="navbar-form navbar-right">
              <div className="form-group">
                <input
                  type="text"
                  onChange={this.props.onAddInput}
                  placeholder="Search..."
                  className="search-bar form-control"
                />
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Folders <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <form onSubmit={this.onAddFolder}>
                      <input
                        className="form-control"
                        placeholder="Add Folder"
                        type="text"
                        ref={newFolder => { this.newFolder = newFolder; }}
                      />
                    </form>
                  </li>
                  {folderArr}
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

module.exports = Navbar;
