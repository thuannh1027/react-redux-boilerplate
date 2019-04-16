const _initialFetchOptions = {
  method: "GET",
  mode: "cors", // no-cors, cors, *same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached  
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  redirect: "follow", // manual, *follow, error
  referrer: "no-referrer", // no-referrer, *client
}

// parses the JSON returned by a network request
const parseJSON = (response) => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

// checks if a network request came back fine, and throws an error if not
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// requests a URL, returning a promise
const request = (url = ``, options) => {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

// make a post request, returning a promise
export const apiPost = (url = ``, options = _initialFetchOptions, data = {}) => {
  return request(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data)
  })
}

// make a get request, returning a promise
export const apiGet = (url = ``, options = _initialFetchOptions) => {
  return request(url, {
    ...options,
    method: "GET"
  })
}