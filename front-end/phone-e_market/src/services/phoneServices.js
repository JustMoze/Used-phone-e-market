import http from './httpService';
import config from '../config.json';

const phoneAPI = config.apiEndpoint + 'phones';

export function getAllPhones() {
    return http.get(phoneAPI);
}
export default {
    getAllPhones
};
