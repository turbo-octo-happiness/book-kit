import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import BookmarkFormContainer from '../content/bookmark-form-container';

class Navbar extends React.Component {
  render() {
    const { onLogoutClick, profile, isAuthenticated } = this.props
    let logoutButton;
    if (isAuthenticated) {
      logoutButton = (
        <div className="navbar-form navbar-right">
            <img src={profile.picture} height="40px" />
            <Link to={'/'} >
              <button className="btn btn-primary" onClick={onLogoutClick}>Logout</button>
            </Link>
        </div>
      )
    }

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
            {logoutButton}
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
