import axios from 'axios';

<<<<<<< HEAD
// axios.post('api/item', data, {
//   //   body: JSON.stringify(this.state)
//   // }).then(() => {
//   //   console.log('request happened');
//   // });

export default {
  // not used
  addItem: (data) => {
    console.log('API file ' + JSON.stringify(data));

    return axios.post('/api/item', {
=======
export default {
  getUser: token => axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`),
  addItem: (item) => {
    console.log(item);
    return fetch('/api/item', {
      method: 'POST',
>>>>>>> master
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    });
  },
  // END not used
  getResources: () => {
    return fetch('/api/learn');
  },
  // mn - this one may need a modifier to target the id
  updateItem: (item) => {
    console.log(item);
    return fetch(`/api/item/${item._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((res) => res.json());
  },
  // mn - current user - handled in BE request.auth.user - this function is incomplete
  getMyItems: () => {
    return fetch('/api/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  getItem: (id) => {
    console.log(id);
    return fetch(`/api/item/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json());
  }
};
