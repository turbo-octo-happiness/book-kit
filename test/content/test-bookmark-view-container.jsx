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
    const deleted = false;

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkViewContainer
        bookmarks={bookmarks}
        bookmark={bookmark}
        folders={folders}
        deleted={deleted}
        params={params}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.be.a('function');
    result.props.onShowEdit.should.be.a('function');
    result.props.onShowDelete.should.be.a('function');
    result.props.onEdit.should.be.a('function');
    result.props.onDelete.should.be.a('function');
    result.props.deleted.should.be.a('boolean');
    result.props.show.should.be.a('boolean');
    result.props.folderArr.should.be.a('array');
    result.props.folders.should.be.a('array');

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
