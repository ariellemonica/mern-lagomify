import axios from 'axios';

export default {
  getItem: (id) => {
    console.log(id);
    return fetch(`/api/item/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json());
  },

  getItems: () => fetch('/api/view'),

  // mn - current user - handled in BE request.auth.user - this function is incomplete
  getMyItems: () => {
    return fetch('/api/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },

  getPlaces: (type) => fetch(`/api/places/${type}`),

  getResources: () => fetch('/api/learn'),

  getUser: token => axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`),
  addItem: (item) => {
    console.log(item);
    return fetch('/api/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
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

  updateMyItems: update => {
    return fetch(`/api/user/items/${update._id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: update.action }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
