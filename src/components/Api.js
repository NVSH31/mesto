export class Api {
  constructor(cohort, token, url) {
    this._cohort = cohort,
    this._token = token,
    this._url = url
  }
  getInitialCards() {
    return fetch(`${this._url}/${this._cohort}/cards`, {
      headers: {
        'authorization': this._token
      }
    });
  }
  getMe() {
    return fetch(`${this._url}/${this._cohort}/users/me`, {
      headers: {
        'authorization': this._token
      }
    });
  }
  editMe(name, about) {
    return fetch(`${this._url}/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }
  addCard(name, link) {
    return fetch(`${this._url}/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        'authorization': this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, link})
    });
  }
  deleteCard(id) {
    return fetch(`${this._url}/${this._cohort}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': this._token
      }
    });
  }
  addLike(id) {
    return fetch(`${this._url}/${this._cohort}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        'authorization': this._token
      }
    });
  }
  deleteLike(id) {
    return fetch(`${this._url}/${this._cohort}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        'authorization': this._token
      }
    });
  }
  editAvatar(url) {
    return fetch(`${this._url}/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'authorization': this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    });
  }
}
