import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import SelectFolder from '../../public/js/content/bookmark-form-folder';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('SelectFolder Component', () => {
  it ('Renders an individual folder dropdown option for bookmark form', () => {
    /* ------- MOCK DATA ------- */
    const folder = {
      folderid: 'folderId',
      foldername: 'folderName',
    };

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <SelectFolder
        folder={folder}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('option');
    result.props.value.should.be.a('string')
      .that.equals('folderId');
    result.props.children.should.be.a('string')
      .that.equals('folderName');
  });
});
