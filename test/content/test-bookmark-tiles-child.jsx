import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { Link } from 'react-router';
import Tile from '../../public/js/content/bookmark-tiles-child';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('Tile Component', () => {
  it('Renders an individual bookmark', () => {
    /* ------- MOCK DATA ------- */
    const title = 'title';
    const id = 'bookmarkId';
    const screenshot = 'image';

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Tile
        title={title}
        id={id}
        screenshot={screenshot}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('li');
    result.props.className.should.equal('bookmark-tile col-md-3');

    const link = result.props.children;
    link.type.should.equal(Link);
    link.type.should.have.property('propTypes');
    link.props.to.should.be.a('string')
      .that.equals('/bookmarks/bookmarkId');

    const name = link.props.children;
    name.type.should.equal('h3');
    name.props.children.length.should.equal(2);

    const background = name.props.children[0];
    background.type.should.equal('div');
    background.props.className.should.equal('bg');
    background.props.style.should.have.property('backgroundImage')
      .that.equals('url(image)');

    const nameDisplay = name.props.children[1];
    nameDisplay.type.should.equal('span');
    nameDisplay.props.children.should.equal('TITLE');
  });
});
