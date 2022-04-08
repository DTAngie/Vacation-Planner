import tokenService from './tokenService';

const BASE_URL = '/api/vacations/';

function create(activity, segmentId, vacationId){
  return fetch(`${BASE_URL}${vacationId}/segments/${segmentId}/activities`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(activity)
  })
  .then(res => res.json())
}

export default {
  create
}