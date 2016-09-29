import React from 'react';
import { Link } from 'react-router';

class Tag extends React.Component {

  render() {
    return (
      <li>
        <div>
          <Link to={`/${this.props.id}`} >
            {this.props.tag}
          </Link>
        </div>
      </li>
    );
  }
}

module.exports = Tag;
