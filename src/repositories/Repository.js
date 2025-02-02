import axios from 'axios';
import { getUserSession } from '../utils/auth';
const baseApi=import.meta.env.VITE_API_URL;
const baseDomainApi = baseApi ? baseApi+'/api/v1':'https://event.api.infoagebd.com/api/v1'
export const baseUrlApi = `${baseDomainApi}`;
export const getUserToken=()=>{
    let token = null;
    if(typeof window !== 'undefined')
        return getUserSession('token');
    return token;
}
export const customHeaders = {
    Accept: 'application/json',
    //withCredentials: true,
    //"Set-Cookie": getCookieInfo(),
    "Authorization" : `Bearer ${getUserToken()}`,
};
export default axios.create({
    //baseUrl,
    headers: customHeaders,
});
export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
