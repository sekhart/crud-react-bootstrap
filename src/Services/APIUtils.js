import axios from "axios";

import { API_BASE_URL } from "../Utils/Constants";
import handleError from "../Utils/handleError";

function getHeaders() {
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Access"] = "application/json";
}

export const get = (path) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_BASE_URL}${path}`, getHeaders())
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const put = (path, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_BASE_URL}${path}`, data, getHeaders())
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const post = (path, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_BASE_URL}${path}`, data, getHeaders())
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const del = (path) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API_BASE_URL}${path}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
