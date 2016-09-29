import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  screenshot: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number,
};
function Tile(props) {
  const style = {
    backgroundImage: `url(${props.screenshot})`,
  };

  return (
    <Link to={`/bookmarks/${props.id}`}>
      <li className="bookmark-tile col-md-3">
        <h3>
          <div className="bg" style={style} />
          <span>
            {props.title}
          </span>
        </h3>
      </li>
    </Link>
  );
}

Tile.propTypes = propTypes;

module.exports = Tile;
