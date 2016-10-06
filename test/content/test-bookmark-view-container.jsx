import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { BookmarkViewContainer } from '../../public/js/content/bookmark-view-container';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('BookmarkViewContainer Component', () => {
  it('Passes props to BookmarkView component', () => {
    /* ------- MOCK DATA ------- */
    const bookmark = {
      bookmarkid: 'bookmarkId',
      title: 'bookmarkTitle',
      screenshot: 'bookmarkImage',
    };
    const bookmarks = [bookmark];
    const folder = {
      folderid: 'folderId',
      foldername: 'folderName',
    };
    const folders = [folder];
    const params = 'bookmarkId';

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkViewContainer
        bookmarks={bookmarks}
        folders={folders}
        params={params}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result.props.bookmark, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.be.a('function');
    result.props.should.have.property('onShowEdit')
      .that.is.a('function');
    result.props.should.have.property('onShowDelete')
      .that.is.a('function');
    result.props.should.have.property('onEdit')
      .that.is.a('function');
    result.props.should.have.property('onDelete')
      .that.is.a('function');
    result.props.should.have.property('delete')
      .that.is.a('boolean');
    result.props.should.have.property('show')
      .that.is.a('boolean');
    result.props.should.have.property('bookmark')
      .that.is.a('array');
    result.props.should.have.property('folderArr')
      .that.is.a('array');
    result.props.should.have.property('folders')
      .that.is.a('array');

    const folderArr = result.props.folderArr;
    folderArr[0].type.should.be.a('function');
    folderArr[0].props.folder.should.have.property('folderid')
      .that.is.a('string')
      .that.equals('folderId');
    folderArr[0].props.folder.should.have.property('foldername')
      .that.is.a('string')
      .that.equals('folderName');

    const foldersArr = result.props.folders;
    foldersArr[0].should.have.property('folderid')
      .that.is.a('string')
      .that.equals('folderId');
    foldersArr[0].should.have.property('foldername')
      .that.is.a('string')
      .that.equals('folderName');
  });
});
