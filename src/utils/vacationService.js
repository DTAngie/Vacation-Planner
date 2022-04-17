import tokenService from './tokenService';

const BASE_URL = '/api/vacations/';

function create(vacation){
  return fetch(`${BASE_URL}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(vacation)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error(res.status);
  });
}

function getVacations(){
  return fetch(`${BASE_URL}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
    }
  })
  .then(res => res.json());
}

function edit(vacationId) {
  return fetch(`${BASE_URL}${vacationId}/edit`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error(res.status);
  });
}

function update(vacationId, vacation){
  return fetch(`${BASE_URL}${vacationId}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(vacation)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error(res.status);
  });
}

function getOne(id) {
  return fetch(`${BASE_URL}${id}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
    }
  })
  .then(res => res.json());
}

function getOneForEdit(id){
  return fetch(`${BASE_URL}${id}/segment/`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
    }
  })
  .then(res => res.json());
}

function deleteOne(vacationId){
  return fetch(`${BASE_URL}${vacationId}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error(res.status);
  });
}

function addFriend(id, email){
  return fetch(`${BASE_URL}${id}/friends`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(email)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error(res.status);
  });
}

function removeFriend(id, profileId){
  return fetch(`${BASE_URL}${id}/friends/${profileId}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error(res.status);
  });
}

export default {
  create,
  getVacations,
  getOne,
  getOneForEdit,
  edit,
  update,
  delete: deleteOne,
  addFriend,
  removeFriend
}