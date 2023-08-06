const token = 'd241e5f6-5dd3-4846-a8da-a823500c9f8c'
const baseUrl ='https://mesto.nomoreparties.co/v1/cohort-64'

class Api {
  constructor(baseUrl, headers) {
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
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: this._headers
      })
      .then(res => this._checkResponse(res))
  }

  patchUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(name, about)
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

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(res => this._checkResponse(res))
  }

}

export const api = new Api(baseUrl, {
  authorization: token,
  'Content-Type': 'application/json'
});