export const authServerDomain = `http://localhost:4000`;
export const appServerDomain = `http://localhost:8000`;

function constructAuthServerURL(endpoint) {
  return `${authServerDomain}${endpoint}`;
}

function constructAppServerURL(endpoint) {
  return `${appServerDomain}${endpoint}`;
}

export async function loginRequest(data) {
  const res = await fetch(constructAuthServerURL('/auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.status === 404) return { error: 'User not found' };
  if (res.status >= 300) return { error: 'Oops, something went wrong' };
  return await res.json();
}

export async function signupRequest(data) {
  const res = await fetch(constructAuthServerURL('/auth/signup'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.status === 409) return { error: 'User already exists' };
  if (res.status >= 300) return { error: 'Oops, something went wrong' };
  return await res.json();
}

export async function accessTokenRequest(refreshToken) {
  const res = await fetch(constructAuthServerURL('/auth/token'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(refreshToken),
  });
  if (res.status === 401) return { error: 'Unauthorized' };
  if (res.status >= 300) return { error: 'Oops, something went wrong' };
  return await res.json();
}

export async function getRequest(endpoint, headers = {}) {
  const result = await fetch(constructAppServerURL(endpoint), {
    method: 'GET',
    headers: {
      ...headers,
    },
  });
  return result;
}

export async function postRequest(endpoint, data, headers = {}) {
  const result = await fetch(constructAppServerURL(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  return result;
}

export async function deleteRequest(endpoint, data, headers = {}) {
  const result = await fetch(constructAppServerURL(endpoint), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data && JSON.stringify(data),
  });
  return result;
}

export async function putRequest(endpoint, data, headers = {}) {
  const result = await fetch(constructAppServerURL(endpoint), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data && JSON.stringify(data),
  });
  return result;
}

export async function searchRequest(endpoint, queryObj) {
  const url = new URL(constructAppServerURL(endpoint));
  Object.keys(queryObj).forEach((key) => url.searchParams.append(key, queryObj[key]));
  const result = await fetch(url);
  return result;
}
