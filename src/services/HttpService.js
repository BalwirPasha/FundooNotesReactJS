import axios from "axios";

function get(url, header) {
  return axios({
    method: 'get',
    url: url,
    headers: header
  })
}

function postData(url, data, header) {
  return axios({
    method: 'post',
    url: url,
    data: data,
    headers: header
  })
}

function postParam(url, params, header) {
  return axios({
    method: 'post',
    url: url,
    params: params,
    headers: header
  })
}

function putData(url, data, header) {
  return axios({
    method: 'put',
    url: url,
    data: data,
    headers: header
  })
}

function putParam(url, params, header) {
  return axios({
    method: 'put',
    url: url,
    params: params,
    headers: header
  })
}

function deleteReq(url, header) {
  return axios({
    method: 'delete',
    url: url,
    headers: header
  })
}

const headerUrl = {
  'Content-type': 'application/x-www-form-urlencoded',
  'Authorization': localStorage.getItem('fundoo_token')
}

const headerJsonWithToken = {
  'Content-type': 'application/json',
  'Authorization': localStorage.getItem('fundoo_token')
}

const headerForm = {
  'Content-type': 'application/x-www-form-urlencoded'
}

const headerJson = {
  'Content-type': 'application/json'
}

export { get, postData, postParam, putData, putParam, deleteReq, headerUrl, headerJson, headerJsonWithToken, headerForm }