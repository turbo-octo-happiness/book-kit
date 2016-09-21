import React, { PropTypes as T } from 'react';
import AuthService from '../../utils/AuthService';

class Login extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  // Social login through github
  githubLogin() {
    this.props.auth.login({
      connection: 'github'
    }, function(err) {
      if (err) alert("Something went wrong: " + err.message);
    });
  }

  signUp() {
    // Calls auth0 signup api, sending new account data
    this.props.auth.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: this.email.value,
      password: this.password.value
    }, function(err) {
      if (err) alert("Something went wrong: " + err.message);
    });
  }

  handleSubmit(event){
    event.preventDefault()
    // on form submit, sends the credentials to auth0 api
    this.props.auth.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: this.email.value,
      password: this.password.value
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  render() {
    return (
      <div>
        <h3>Sign in to your account</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h4>Email Address</h4>
          <input
            type="text"
            ref={email => { this.email = email; }}
            placeholder="you@example.com"
          />

          <h4>Password</h4>
          <input
            type="text"
            ref={password => { this.password = password; }}
          />

          <button
            type="submit"
            >Sign In
          </button>
          <button
            onClick={this.signup.bind(this)}
            >Sign Up
          </button>
          <button
            onClick={this.githubLogin.bind(this)}
            >Login with Github
          </button>
        </form>
      </div>
    )
  }
}

export default Login;
