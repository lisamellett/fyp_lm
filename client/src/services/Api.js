/* eslint-disable */
import axios from 'axios';
import store from '../store/store'

// we must add an authentication header to the request header
// so we can validate if users are authenticated or not

export default () => {
  return axios.create({
    baseURL: 'https://mykin.herokuapp.com/',
    headers: {
      Authorization: `Bearer ${store.state.token}`,
      // now whenever that token is set it will add it to the Authorization header
    }
  })
}

// create an axios object which will point to our backend url
// this is used to hitting our different api endpoints
