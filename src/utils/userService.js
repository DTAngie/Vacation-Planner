import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user){
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

function getUser(){
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error(res.status);
  })
  .then(({token}) => tokenService.setToken(token));
}

function updateProfile(id, profile) {
  return fetch(`${BASE_URL}${id}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(profile)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error(res.status);
  });
}

export default {
  signup,
  getUser,
  logout,
  login,
  updateProfile
}