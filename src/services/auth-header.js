export default function authHeader() {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
  
    // if user & jwt exist, return header, otherwise blank header (which will be forbidden)
    if (jwt) {
      return { Authorization: 'Bearer ' + jwt };
    } else {
      return {};
    }
  }