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
  const res = await result.json();
  return res;
}

export async function getData(endpoint, headers = {}) {
  const result = await fetch(constructURL(endpoint), {
    method: 'GET',
    headers: {
      ...headers,
    },
  });
  const res = await result.json();
  return res;
}

export async function postData(endpoint, data, headers = {}) {
  console.log(data);
  const result = await fetch(constructURL(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  const res = await result.json();
  return res;
}

export async function deleteData(endpoint, data) {
  const result = await fetch(constructURL(endpoint), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const res = await result.json();
  return res;
}
