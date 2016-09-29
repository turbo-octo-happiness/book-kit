import React from 'react';
import { Link } from 'react-router';

class Tag extends React.Component {

  render() {
    return (
      <li>
        <div>
          <Link to={`/${this.props.id}`} >
            <i className="fa fa-tag" aria-hidden="true" />
            <span>{this.props.tag}</span>
          </Link>
        </div>
      </li>
    );
  }
}

module.exports = Tag;
