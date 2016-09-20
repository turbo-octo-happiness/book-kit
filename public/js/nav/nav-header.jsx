import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import BookmarkFormContainer from '../content/bookmark-form-container';

const propTypes = {
  addFolder: PropTypes.func,
  folders: PropTypes.array,
  onAddInput: PropTypes.func,
};

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
    return (
      <header>
        <nav className="navbar">
          <ul className="">
            <li>
              <Link className="logo" to={'/'}>
                <svg
                  width="136px"
                  height="28px"
                  viewBox="0 0 136 28"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="logo_28px_black"
                      fill="#fff"
                    >
                      <path
                        d="M9,20 L12,20 L12,8.02439022 L3,8.02439022 L3,3 L20,3 L20,0 L0,0 L0,11 L9,11 L9,20 L9,20 Z"
                        id="Shape"
                      />
                      <path
                        d="M17,8.02439022 L17,25 L9,25 L9,28 L20,28 L20,11 L28,11 L28,0 L25,0 L25,8.02439022 L17,8.02439022 L17,8.02439022 Z"
                        id="Shape"
                      />
                      <path
                        d="M42,11.5 L42,20 L45,20 L45,11.5 L48.5,11.5 L48.5,9 L38.5,9 L38.5,11.5 L42,11.5 Z"
                        id="Shape"
                      />
                      <path
                        d="M66,9.0000004 L66.0000001,20.0000004 L69,20 L68.9999999,9 L66,9.0000004 L66,9.0000004 Z"
                        id="Rectangle-path"
                      />
                      <path
                        d="M54.9999999,13 L54.8867273,9 L52,9 L52,20 L55,20 L55,15.5 L59,15.5 L59,20 L62,20 L62,9 L59,9 L59,13 L54.9999999,13 L54.9999999,13 Z"
                        id="Shape"
                      />
                      <path
                        d="M100,20 L103,20 L103,16 L108,16 L108,13.6222048 L103,13.6222048 L103,11.5 L108.5,11.5 L108.5,9 L100,9 L100,20 L100,20 Z"
                        id="Shape"
                      />
                      <path
                        d="M80,15.5 L76.0307269,9 L73,9 L73,20 L76.0307269,20 L76.0307269,13.5 L80,20 L83,20 L83,9 L80,9 L80,15.5 L80,15.5 Z"
                        id="Shape"
                      />
                      <path
                        d="M130,9 L127,9 L127,20 L135.5,20 L135.5,17.5 L130,17.5 L130,9 L130,9 Z"
                        id="Shape"
                      />
                      <path
                        d="M93.5,9.0192589 L90,13.9999999 L90,9.0192589 L87,9.0192589 L87,20 L90,20.0000004 L90,14.9999999 L93.5,20.0000004 L97,20 L93,14.5096297 L97,9.0192589 L93.5,9.0192589 L93.5,9.0192589 Z"
                        id="Shape"
                      />
                      <path
                        d="M117.5,20.5 C120.537566,20.5 123,18 123,15 L123,9 L120,9 L120,14.5 C120,16 119.5,17.5 117.5,17.5 C115.5,17.5 115,16 115,14.5 L115,9 L112,9 L112,15 C112,18 114.462434,20.5 117.5,20.5 L117.5,20.5 Z"
                        id="Oval-1"
                      />
                    </g>
                  </g>
                </svg>
              </Link>
            </li>
            <li>
              <a className="button button__white add-bookmark" href="#">
                <span>+</span>
              </a>
              {/* <div className="modal fade" id="add-form">
                <BookmarkFormContainer />
              </div> */}
            </li>
          </ul>
          <input
            type="text"
            onChange={this.props.onAddInput}
            placeholder="Search..."
            className="search-bar form-control"
          />
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = propTypes;

module.exports = Navbar;
