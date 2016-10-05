import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { BookmarkTilesContainer } from '../../public/js/content/bookmark-tiles-container';

const should = chai.should();

describe('BookmarkTilesContainer component', () => {
  it('Renders BookmarkTiles and passes props when params is foldername and search state is falsey', () => {
    /* ------- MOCK DATA ------- */
    const bookmark = {
      bookmarkid: 'bookmarkId',
      title: 'bookmarkTitle',
      screenshot: 'bookmarkImage',
    };
    const bookmarks = [bookmark];
    const params = {
      folderName: 'foldername',
      tagId: false,
    };
    const search = '';

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkTilesContainer
        params={params}
        bookmarks={bookmarks}
        search={search}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log('RESULT >>>', result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.be.a('function');
    result.type.should.have.property('propTypes').with.property('tileArr');
    result.props.should.have.property('tileArr');
    result.props.tileArr.should.be.a('array');
  });

  it('Renders BookmarkTiles and passes props when params is tagid and search state is falsey', () => {
    /* ------- MOCK DATA ------- */
    const bookmark = {
      bookmarkid: 'bookmarkId',
      title: 'bookmarkTitle',
      screenshot: 'bookmarkImage',
    };
    const bookmarks = [bookmark];
    const params = {
      folderName: false,
      tagId: 'tagid',
    };
    const search = '';

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkTilesContainer
        params={params}
        bookmarks={bookmarks}
        search={search}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log('RESULT >>>', result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.be.a('function');
    result.type.should.have.property('propTypes').with.property('tileArr');
    result.props.should.have.property('tileArr');
    result.props.tileArr.should.be.a('array');
  });

  it('Renders BookmarkTiles and passes props when search state is true and no params', () => {
    /* ------- MOCK DATA ------- */
    const bookmark = {
      bookmarkid: 'bookmarkId',
      title: 'bookmarkTitle',
      screenshot: 'bookmarkImage',
    };
    const bookmarks = [bookmark];
    const params = {
      folderName: false,
      tagId: false,
    };
    const search = 'query';

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkTilesContainer
        params={params}
        bookmarks={bookmarks}
        search={search}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log('RESULT >>>', result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.be.a('function');
    result.type.should.have.property('propTypes').with.property('tileArr');
    result.props.should.have.property('tileArr');
    result.props.tileArr.should.be.a('array');
  });

  it('Renders BookmarkTiles and passes props when params and search state are falsey', () => {
    /* ------- MOCK DATA ------- */
    const search = '';
    const bookmark = {
      bookmarkid: 'bookmarkId',
      title: 'bookmarkTitle',
      screenshot: 'bookmarkImage',
    };
    const bookmarks = [bookmark];
    const params = {
      folderName: false,
      tagId: false,
    };

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkTilesContainer
        params={params}
        bookmarks={bookmarks}
        search={search}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log('RESULT >>>', result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.be.a('function');
    result.type.should.have.property('propTypes').with.property('tileArr');
    result.props.should.have.property('tileArr');
    result.props.tileArr.should.be.a('array');
  });

  it('Renders BookmarkTiles and passes props when params and search state are true', () => {
    /* ------- MOCK DATA ------- */
    const search = 'query';
    const bookmark = {
      bookmarkid: 'bookmarkId',
      title: 'bookmarkTitle',
      screenshot: 'bookmarkImage',
    };
    const bookmarks = [bookmark];
    const params = {
      folderName: 'foldername',
      tagId: false,
    };

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkTilesContainer
        params={params}
        bookmarks={bookmarks}
        search={search}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log('RESULT >>>', result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.be.a('function');
    result.type.should.have.property('propTypes').with.property('tileArr');
    result.props.should.have.property('tileArr');
    result.props.tileArr.should.be.a('array');
  });
});
