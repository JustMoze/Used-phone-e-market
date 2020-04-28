import http from './httpService';
import config from '../config.json';

const phoneAPI = config.apiEndpoint + 'phones';
const specificPhoneAPI = `${phoneAPI}/`;

export function getAllPhones() {
    return http.get(phoneAPI);
}
export function getPhone(phoneID) {
    return http.get(specificPhoneAPI + phoneID);
}
export default {
    getAllPhones,
    getPhone
};
