import tokenService from './tokenService';

const BASE_URL = '/api/vacations/';

function create(segment, vacationID){
  return fetch(`${BASE_URL}${vacationID}/segments`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(segment)
  })
  .then(res => res.json())
}

export default {
  create
}