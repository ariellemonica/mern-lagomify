export default {
    addItem: (item) => {
        return fetch('/item', {
            method: 'POST',
            body: JSON.stringify(item)
        })
    }
}