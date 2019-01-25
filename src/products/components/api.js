import apiUrl from '../../apiConfig'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const createProduct = (credentials) => {
  return fetch(apiUrl + '/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${credentials.token}`
    },
    body: JSON.stringify({
      product: credentials.product
    })
  })
}

export const showProduct = user => {
  return fetch(apiUrl + '/products', {
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
