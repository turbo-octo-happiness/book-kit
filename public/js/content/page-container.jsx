import React, { PropTypes } from 'react';
import SidebarContainer from '../sidebar/sidebar-container';

const propTypes = {
  children: PropTypes.object,
};

function PageContainer(props) {
  return (
    <section className="main-section">
      <div className="main-container">
        <SidebarContainer />
        {props.children}
      </div>
    </section>
  );
}

PageContainer.propTypes = propTypes;

module.exports = PageContainer;
