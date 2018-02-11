import axios from 'axios';

export default() => (axios.create({ baseURL: 'http://localhost:8081/' }));

// create an axios object which will point to our backend url
// this is used to hitting our different api endpoints
