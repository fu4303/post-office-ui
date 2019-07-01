import fetch from 'isomorphic-fetch';

export default function httpHandler(url, data = {}, options = {}) {
  if (!url) {
    throw Error('URL is missing');
  }
  return new Promise(function(resolve, reject) {
    const method = options.method || 'GET';
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined
    }).then(function(response) {
      return response.json();
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
}