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
    // mn - this one may need a modifier to target the id
    updateItem: (item) => {
        console.log(item)
        return fetch('/api/item/:id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
    },
    // mn - this one will need to pass in the currently logged in user
    getMyItems: (user) => {
        console.log(user)
        return fetch('/api/user/view-items'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
    },
    viewItemDetails: (item) => {
        console.log(item)
        return fetch('/api/item/', item.id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }
    }
}