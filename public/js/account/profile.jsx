import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

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

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
  };
}

module.exports = connect(mapStateToProps)(Profile);
