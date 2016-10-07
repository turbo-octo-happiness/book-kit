const jwt = require('jwt-simple');

// Code to generate JWT tokens
const authSecret = new Buffer(process.env.AUTH0_SECRET, 'base64');
const payload = {
  iss: 'https://ericsnell.auth0.com/',
  sub: 'auth0|57e97dbede4a3f3c0395b316',
  aud: '6ElpyE9EazmBox2b9PAWytCnFJQTxBCa',
  email_verified: true,
  identities: [{
    provider: 'auth0',
    connection: 'Username-Password-Authentication',
    isSocial: false,
  }],
};

// Fake customers
const customer1 = {
  email: 'sg@gmail.com',
  user_id: '123',
};
const customer2 = {
  email: 'zy@gmail.com',
  user_id: '456',
};

const generateToken = (user) => {
  const content = Object.assign({}, payload);
  content.email = user.email;
  content.identities[0].user_id = user.user_id;
  return jwt.encode(content, authSecret);
};

const customer1Token = generateToken(customer1);
const customer2Token = generateToken(customer2);

exports.customer1 = customer1;
exports.customer2 = customer2;
exports.customer1Token = customer1Token;
exports.customer2Token = customer2Token;
