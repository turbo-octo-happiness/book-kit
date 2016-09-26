import React from 'react';

class Profile extends React.Component {


  render() {
    console.log(this.props.profile, '<===== Profile')
    return(
      <div>
        <img src={this.props.profile.picture} alt="Avatar" />
        <h3>Name: {this.props.profile.name}</h3>
        <h4>Email: {this.props.profile.email}</h4>

        <h4>Github: <a>{this.props.profile.html_url}</a></h4>

      </div>
    );
  }
}

module.exports = Profile;
