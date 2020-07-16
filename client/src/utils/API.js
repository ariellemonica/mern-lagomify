import axios from "axios";

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
    getUser: token => axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
}
