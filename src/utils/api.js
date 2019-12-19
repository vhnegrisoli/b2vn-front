const env = process.env.REACT_APP_ENV;
export const BACK_END_AUTH =
  env === 'DEV' ? 'http://localhost:8080' : 'https://b2vn-auth-api.herokuapp.com';
export const BACK_END_RADARES =
  env === 'DEV' ? 'http://localhost:8081' : 'https://b2vn-radar-api.herokuapp.com';
