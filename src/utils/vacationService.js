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
  .then(res => res.json())
}
// TODO: is this ID parameter needed?
function getVacations(id){
  return fetch(`${BASE_URL}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
    }
  })
  .then(res => res.json())
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

function getOne(id) {
  return fetch(`${BASE_URL}${id}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
    }
  })
  .then(res => res.json())
}

function getOneForEdit(id){
  return fetch(`${BASE_URL}${id}/segment/`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
    }
  })
  .then(res => res.json())
}

export default {
  create,
  getVacations,
  getOne,
  getOneForEdit,
  edit
}