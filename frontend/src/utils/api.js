// const token = 'd241e5f6-5dd3-4846-a8da-a823500c9f8c'
// const baseUrl ='https://mesto.nomoreparties.co/v1/cohort-64'
// const baseUrl = 'http://127.0.0.1:4000'

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(resolve) {
    if (resolve.ok) {
      return resolve.json();
    } else {
      return Promise.reject(`Ошибка ${resolve.status}: ${resolve.statusText}`)
    }
  }

  getUserInfo() {
    const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: {'Authorization':`Bearer ${token}`}
      })
      .then(res => this._checkResponse(res))
  }

  patchUserInfo({name, about}) {
    // const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({name, about})
      })
      .then(res => this._checkResponse(res))
  }

  getStarterCards() {
    // const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/cards`,
      {
        method: 'GET',
        headers: this._headers
      })
      .then(res => this._checkResponse(res))
  }

  addCardToServer( name, link ) {
    // const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(name, link)
      })
      .then(res => this._checkResponse(res))
  }

  deleteCard(cardId) {
    // const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._checkResponse(res))
  }

  setLikes(cardId) {
    // const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: 'PUT',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
  }

  deleteLikes(cardId) {
    // const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
  }

  setUserAvatar(avatar) {
    // const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(avatar)
      })
      .then(res => this._checkResponse(res))
  }

  updateToken() {
    this._headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  }

}




export const api = new Api({
  baseUrl: 'http://localhost:4000',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  }
});