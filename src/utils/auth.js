const checkResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
};

export const BASE_URL = "https://auth.nomoreparties.co";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
  .then((res) => checkResponseData(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
  .then((res) => checkResponseData(res));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => checkResponseData(res));
};