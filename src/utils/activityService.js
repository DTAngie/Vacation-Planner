import tokenService from './tokenService';

const BASE_URL = '/api/vacations/';

function create(vacationId, segmentId, activity){
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

function edit(vacationId, segmentId, activityId){
  return fetch(`${BASE_URL}${vacationId}/segments/${segmentId}/activities/${activityId}/edit`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
}

export default {
  create,
  edit
}