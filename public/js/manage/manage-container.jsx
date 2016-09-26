import React from 'react';
import ManageSidebar from './manage-sidebar';

function ManageContainer(props) {
  return (
    <div>
      <section className="main-section container">
        <ManageSidebar />
        {props.children}
      </section>
    </div>
  );
}

module.exports = ManageContainer;
