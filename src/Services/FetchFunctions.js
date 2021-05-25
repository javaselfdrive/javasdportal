import axios from "axios";
const BASE_URL_CLIENT ="http://206.189.105.47:8090/api/v1/client/";
const BASE_URL = "http://206.189.105.47:8090/api/v1/";


function getRequest(endpoint) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    var options = {
      headers: { Authorization: "Bearer " + userData.jwttoken },
    };
    return axios.get(BASE_URL + endpoint, options);
  } else {
    return axios.get(BASE_URL + endpoint);
  }
}

function post_request(endpoint, payload) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    var options = {
      headers: { Authorization: "Bearer " + userData.jwttoken },
    };
   
    return axios.post(BASE_URL + endpoint, payload, options);
  } else {
    return axios.post(BASE_URL + endpoint, payload);
  }
}

export { getRequest,post_request };
