import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { FolderContainer } from '../../public/js/sidebar/sidebar-folder-container';
import SidebarFolder from '../../public/js/sidebar/sidebar-folder';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('SidebarFolderContainer Component', () => {
  it('Passes...', () => {
    /* ------- MOCK DATA ------- */

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <FolderContainer

      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */

  });

});
