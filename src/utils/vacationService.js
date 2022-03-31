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
  .then(res =>  {
    res.json()
  })
}

export default {
  create
}