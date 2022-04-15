import axios from 'axios';
// const baseUrl = 'http://django.localhost';

export const fetchSinToken = async (api, endpoint, data, method = 'get') => {
  const url = `${api}/${endpoint}`;

  if (method === 'get') {
    try {
      const resp = await axios.get(url);
      if (resp.status === 200) {
        return resp.data;
      }
    } catch (error) {
      throw new Error(error);
    }
  } else {
    try {
      const resp = await axios[method](url, data);
      return resp.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};
