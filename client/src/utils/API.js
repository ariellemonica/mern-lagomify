import axios from "axios";

export const getUser = token => axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);