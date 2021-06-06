import axios from 'axios';

const get = (api, params) => {
  return axios.get(api, { params }).then((res) => {
    if (res.status === 200) {
      return res.data;
      // if (res.data.success === true) {
      //   return res.data.data;
      // } else if (res.data.code === 301) {
      //   // history.push('/login');
      // }
    }
  })
};

const post = (api, params) => {
  return axios.post(api, params).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
  })
};

export default {
  get,
  post
};