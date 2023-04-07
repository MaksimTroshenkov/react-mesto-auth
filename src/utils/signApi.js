class signApi {
  constructor(options) {
    this._baseUrl = options.url;
    this._headers = options.headers;
  }

  _checkResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  signUp(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: data.pass,
        email: data.email
      })
    })
    .then(res => this._checkResponseData(res))
  }

  signIn(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: data.pass,
        email: data.email
      })
    })
    .then(res => this._checkResponseData(res))
  }

  user(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    })
    .then(res => this._checkResponseData(res))
  }
}

export default new signApi({
  url: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json"
  }
});