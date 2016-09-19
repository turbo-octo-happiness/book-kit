import React from 'react';
import { Link } from 'react-router';

function Tile(props) {
  let style = {
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

module.exports = Tile;
