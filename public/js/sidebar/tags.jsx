import React from 'react';
import { Link } from 'react-router';

class Tag extends React.Component {

  render() {
    return (
      <li>
        <div>
          <Link to={`/${this.props.tagid}`} >
            <i className="fa fa-tag" aria-hidden="true" />
            <span>{this.props.tagname}</span>
          </Link>
        </div>
      </li>
    );
  }
}

module.exports = Tag;
