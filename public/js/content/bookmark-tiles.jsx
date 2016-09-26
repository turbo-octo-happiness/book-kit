import React, { PropTypes } from 'react';
import { Row } from 'react-bootstrap';

const propTypes = {
  tileArr: PropTypes.array,
};

function BookmarkTiles(props) {
  return (
    <section className="tile-section">
      <Row>
        {props.tileArr}
      </Row>
    </section>
  );
}

BookmarkTiles.propTypes = propTypes;

module.exports = BookmarkTiles;
