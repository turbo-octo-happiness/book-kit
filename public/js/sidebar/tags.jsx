import React from 'react';


class Tag extends React.Component {

  render() {
    return (
      <li>
        <h3>{this.props.name}</h3>
      </li>
    )
  }
}

module.exports = Tag;
