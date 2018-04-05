/* eslint-disable */
import Api from '@/services/Api';

export default {
  register(credentials) {
    return Api().post('/users/register', credentials);
  },
  login(credentials) {
    return Api().post('/users/login', credentials);
  },
};

// we want to do a post request to the /register endpoint and we are sending in some
// credentials - files involved Api.js, app.js

// export an object which has a register method
// and we can call this like this:

// AuthenticationService.register({
//   email: 'test@gmail.com',
//   password: '12345',
// });

// this will return these credentials to the axios module
// which will do a post request on our express server
