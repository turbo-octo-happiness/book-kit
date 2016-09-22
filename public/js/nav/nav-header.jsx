import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import Folder from './nav-folder-container';
import BookmarkFormContainer from '../content/bookmark-form-container';

const propTypes = {
  addFolder: PropTypes.func,
  folders: PropTypes.array,
  onAddInput: PropTypes.func,
};

class Navbar extends React.Component {
  constructor() {
    super();

  }

  render() {
    const { onLogoutClick } = this.props
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
            <div className="navbar-form navbar-right">

              <ul className="list-inline">
                <li><button className="btn btn-primary" onClick={onLogoutClick}>Logout</button></li>
              </ul>

            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = propTypes;

module.exports = Navbar;
