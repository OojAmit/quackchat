module.exports = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  mongodb: {
    dbURI: process.env.MONGODB_URI
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  },
  firebase: {
    admin: {
      "type": process.env.FIREBASE_ADMIN_TYPE,
      "project_id": process.env.FIREBASE_ADMIN_PROJECT_ID,
      "private_key_id": process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
      "private_key": JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY),
      "client_email": process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      "client_id": process.env.FIREBASE_ADMIN_CLIENT_ID,
      "auth_uri": process.env.FIREBASE_ADMIN_AUTH_URI,
      "token_uri": process.env.FIREBASE_ADMIN_TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
      "client_x509_cert_url": process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
    }
  }
}
