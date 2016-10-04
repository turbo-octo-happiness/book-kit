import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  tagname: PropTypes.string,
  tagid: PropTypes.number,
};

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

Tag.propTypes = propTypes;

module.exports = Tag;
