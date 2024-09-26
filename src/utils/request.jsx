const API_DOMAIN = "http://localhost:3002/";

export const get = async (path) => {
  const response = await fetch(`${API_DOMAIN}${path}`);
  return await response.json();
}

export const post = async (path, options) => {
  const response = await fetch(`${API_DOMAIN}${path}`, {
    method: 'POST', headers: {
      Accept: 'application/json', 'Content-Type': 'application/json'
    }, body: JSON.stringify(options)
  });
  return await response.json();
}

export const del = async (path, id) => {
  const response = await fetch(`${API_DOMAIN}${path}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}

export const patch = async (path, options) => {
  const response = await fetch(`${API_DOMAIN}${path}`, {
    method: 'PATCH', headers: {
      Accept: 'application/json', 'Content-Type': 'application/json'
    }, body: JSON.stringify(options)
  });
  return await response.json();
}