export default {
    addItem: (item) => {
        console.log(item)
        return fetch('/api/item', {
            method: 'POST',
            body: JSON.stringify(item)
        })
    }
}