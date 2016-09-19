import React from 'react';

function BookmarkTiles(props) {
  return (
    <section className="tile-section">
      <ul className="row">
        {props.tileArr}
      </ul>
    </section>
  );
}

module.exports = BookmarkTiles;
