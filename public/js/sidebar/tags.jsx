import React from 'react';

class Tag extends React.Component {

  render() {
    return (
      <li>
        <div onClick={this.props.findBookmarks}>{this.props.name}</h3>
      </li>
    )
  }
}

module.exports = Tag;
