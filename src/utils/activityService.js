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
  .then(res => {
    if (res.ok) return res.json()
    throw new Error(res.status)
  })
}

function edit(vacationId, segmentId, activityId){
  return fetch(`${BASE_URL}${vacationId}/segments/${segmentId}/activities/${activityId}/edit`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) return res.json()
    throw new Error(res.status)
  })
}

function update(vacationId, segmentId, activityId, activity){
  return fetch(`${BASE_URL}${vacationId}/segments/${segmentId}/activities/${activityId}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(activity)
  })
  .then(res => {
    if (res.ok) return res.json()
    throw new Error(res.status)
  })
}

function deleteOne(vacationId, segmentId, activityId){
  return fetch(`${BASE_URL}${vacationId}/segments/${segmentId}/activities/${activityId}`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
  .then(res => {
    if (res.ok) return res.json()
    throw new Error(res.status)
  })
}

export default {
  create,
  edit,
  update,
  delete: deleteOne
}