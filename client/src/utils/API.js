export default {
  addItem: (item) => {
    console.log(item);
    return fetch('/api/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
  }
};
