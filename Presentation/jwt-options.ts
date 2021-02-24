import jwksRsa = require('jwks-rsa');

export const jwtOptions = {
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://avatarbox.us.auth0.com/.well-known/jwks.json',
  }),

  // Validate the audience and the issuer.
  aud: 'https://api.avatarbox.io/',
  issuer: 'https://avatarbox.us.auth0.com/',
  algorithms: ['RS256'],
};
