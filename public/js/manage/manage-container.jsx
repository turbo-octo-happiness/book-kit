import React from 'react';
import ManageSidebar from './manage-sidebar';

function ManageContainer(props) {
  return (
    <section className="main-section container">
      <div className="main-container">
        <ManageSidebar />
        {props.children}
      </div>
    </section>
  );
}

module.exports = ManageContainer;
