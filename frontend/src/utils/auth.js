export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`)
  }
}

export const registrationUser = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(checkResponse)
};

// Успешный ответ:

// {
//     "data": {
//         "_id": "5f5204c577488bcaa8b7bdf2",,
//         "email": "email@yandex.ru"
//     }
// }

export const loginUser = ({password, email}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(checkResponse)
};

// Пример успешного ответа:

// {
//     "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
// }

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(checkResponse)
}

// Пример успешного ответа:

// {
//     "_id":"1f525cf06e02630312f3fed7",
//     "email":"email@email.ru"
// }