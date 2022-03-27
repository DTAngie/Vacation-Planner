import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user){
  console.log('userService')
  return fetch(`${BASE_URL}signup`, {
    headers: new Headers({'Content-Type': 'application/json'}),
    method: 'POST',
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Email already taken!');
  })
  .then(({token}) => tokenService.setToken(token));
}

export default {
  signup,
}