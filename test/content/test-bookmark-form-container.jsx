import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { BookmarkFormContainer } from '../../public/js/content/bookmark-form-container';

const should = chai.should();

describe('BookmarkFormContainer component', () => {
  it('Passes folder state and onAdd function as props to children', () => {
    /* ------- MOCK DATA ------- */
    const folder = {
      folderid: 'folderId',
      foldername: 'folderName',
    };
    const folders = [folder];
    const onAdd = () => {
      // Test Function
    };

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkFormContainer
        folders={folders}
        onAdd={onAdd}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.be.a('function');
    result.props.folders.should.be.a('array');
    result.props.folders[0].should.have.property('folderid')
      .that.is.a('string')
      .that.equals('folderId');
    result.props.folders[0].should.have.property('foldername')
      .that.is.a('string')
      .that.equals('folderName');
    result.props.should.have.property('onAdd')
      .that.is.a('function');
  });
});
