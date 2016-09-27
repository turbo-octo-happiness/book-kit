import React, { PropTypes } from 'react';

const propTypes = {
  tileArr: PropTypes.array,
};

function BookmarkTiles(props) {
  return (
    <section className="content-section">
      <ul>
        {props.tileArr}
      </ul>
    </section>
  );
}

BookmarkTiles.propTypes = propTypes;

module.exports = BookmarkTiles;
