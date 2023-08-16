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
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({name, about})
      })
      .then(res => this._checkResponse(res))
  }

  getStarterCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        method: 'GET',
        headers: this._headers
      })
      .then(res => this._checkResponse(res))
  }

  addCardToServer( name, link ) {
    return fetch(`${this._baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(name, link)
      })
      .then(res => this._checkResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._checkResponse(res))
  }

  setLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: 'PUT',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
  }

  deleteLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => this._checkResponse(res))
  }

  setUserAvatar(avatar) {
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
  baseUrl: 'https://api.green.nomoreparties.co',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  }
});