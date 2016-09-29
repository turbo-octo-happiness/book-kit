import React from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/nav-header-container';
import actions from '../redux/actions';
import SidebarContainer from '../sidebar/sidebar-container';

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

module.exports = PageContainer;
