import tokenService from './tokenService';

const BASE_URL = '/api/vacations/';

function create(segment, vacationId){
  return fetch(`${BASE_URL}${vacationId}/segments`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(segment)
  })
  .then(res => res.json())
}

function getSegments(vacationId){
  return fetch(`${BASE_URL}${vacationId}/segments`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
    }
  })
  .then(res => res.json())
}

function getOne(vacationId, segmentId){
  return fetch(`${BASE_URL}${vacationId}/segments/${segmentId}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
    }
  })
  .then(res => res.json())
}

export default {
  create,
  getSegments,
  getOne
}