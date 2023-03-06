// Change this to your own IP address if running the server on your
// local machine else change to the URL of the deployed server

export const serverURL = `http://localhost:8000`;

function constructURL(endpoint) {
  return `${serverURL}${endpoint}`;
}

export async function searchData(endpoint, queryObj) {
  const url = new URL(constructURL(endpoint));
  Object.keys(queryObj).forEach((key) => url.searchParams.append(key, queryObj[key]));
  const result = await fetch(url);
  return result;
}

export async function getData(endpoint, headers = {}) {
  const result = await fetch(constructURL(endpoint), {
    method: 'GET',
    headers: {
      ...headers,
    },
  });
  return result;
}

export async function postData(endpoint, data, headers = {}) {
  const result = await fetch(constructURL(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  return result;
}

export async function deleteData(endpoint, data, headers = {}) {
  const result = await fetch(constructURL(endpoint), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data && JSON.stringify(data),
  });
  return result;
}

export async function updateData(endpoint, data, headers = {}) {
  const result = await fetch(constructURL(endpoint), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data && JSON.stringify(data),
  });
  return result;
}
