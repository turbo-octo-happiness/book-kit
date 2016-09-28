import React from 'react';
import { Link } from 'react-router';

function ManageSidebar() {
  return (
    <section className="sidebar">
      <ul>
        <li>
          <Link to="/manage/profile">Profile</Link>
        </li>
        <li>
          <Link to="/manage/folders">Manage Folders</Link>
        </li>
        <li>
          <Link to="/manage/tags">Manage Tags</Link>
        </li>
      </ul>
    </section>
  );
}

module.exports = ManageSidebar;
