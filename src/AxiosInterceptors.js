// Interceptors to help with Http requests/responses with axios

import axios from 'axios';

const requestCache = [];

const requestCacheInterceptor = axios.interceptors.request.use((config) => {
  if (requestCache.indexOf(config.url) >= 0) {
    console.log('Your request was throttled because it is a duplicate. Refresh the page or await the response');
    return Promise.reject('Request already made');
  }
  else {
    requestCache.push(config.url);
    return config; 
  }
});

const responseCacheInterceptor = axios.interceptors.response.use((response) => {
  let reqIndex = requestCache.indexOf(response.config.url);
  if (reqIndex >= 0) {
    requestCache.splice(reqIndex, 1);
  }
  return response; 
})

export default requestCacheInterceptor; 