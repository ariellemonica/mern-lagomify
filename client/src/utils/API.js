export default {
    addItem: (item) => {
        console.log(item)
        return fetch('/api/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
    },
    // this one may need a modifier to target the id
    updateItem: (item) => {
        console.log(item)
        return fetch ('/api/item/:id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
    }
}