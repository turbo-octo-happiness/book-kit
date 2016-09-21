import Auth0 from 'auth0-js'

export default class AuthService {
  constructor(clientId, domain) {
    super()
    var options = {
      auth: {
        responseType: 'token',
        params: {
          scope: 'openid name email'
        }
      }
    }
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, options)
    this.auth0 = new Auth0({
      clientID: clientId,
      domain: domain,
      responseType: 'token'
    });

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }

  login(params, onError){
    // Redirects the call to auth0 instance
    this.auth0.login(params, onError)
  }

  signup(params, onError){
    // Redirects the call to auth0 instance
    this.auth0.signup(params, onError)
  }

  parseHash(hash){
    // Uses auth0 parseHash method to extract data from url hash
    const authResult = this.auth0.parseHash(hash)
    if (authResult && authResult.idToken) {
      this.setToken(authResult.idToken)
    }
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }
}
