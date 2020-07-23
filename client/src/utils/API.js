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

  getMyItems: (createdBy) => {
    return fetch(`/api/items/${createdBy}`, {
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

  updateItem: (item) => {
    console.log(item);
    console.log(item._id);
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
