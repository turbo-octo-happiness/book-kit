import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import BookmarkTiles from '../../public/js/content/bookmark-tiles';

const should = chai.should();

describe('BookmarkTiles component', () => {
  it('Renders list of tiles', () => {
    /* ------- MOCK DATA ------- */
    const tileProps = {
      key: 'bookmarkId',
      title: 'title',
      id: 'bookmarkId',
      screenshot: 'image',
    };
    const Tile = (
      <li>{tileProps}</li>
    );
    const tileArr = [Tile];

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkTiles
        tileArr={tileArr}
      />
    );
    const result = renderer.getRenderOutput();
    console.log('RESULT >>>', result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('section');
    result.props.className.should.equal('content-section');
    result.props.children.type.should.equal('ul');

    const tile = result.props.children.props.children[0];
    tile.type.should.equal('li');
    tile.props.children.key.should.be.a('string')
      .that.equals('bookmarkId');
    tile.props.children.title.should.be.a('string')
      .that.equals('title');
    tile.props.children.id.should.be.a('string')
      .that.equals('bookmarkId');
    tile.props.children.screenshot.should.be.a('string')
      .that.equals('image');
  });
});
