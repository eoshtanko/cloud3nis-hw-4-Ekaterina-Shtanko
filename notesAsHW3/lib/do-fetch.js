const END_POINT = 'http://localhost:3000';

export function* doFetch({ method, url, data }) {
  const fullPath = END_POINT + url;
  try {
    let response = yield fetch(fullPath, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    response = yield response.json();
    console.log('Response: ' + response)
    return { data: response };
  } catch (error) {
    return error;
  }
}