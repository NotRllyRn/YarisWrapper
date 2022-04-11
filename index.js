import fetch from 'node-fetch';

export default class Yaris {
    constructor(API_KEY) {
        this.#API_KEY = API_KEY;

        this.request('POST', 'info', {}).then(res => res.json()).then(data => {
            if (data && data.information) {
                this.information = data.information;
            } else return data.error.message;
        }).catch(err => console.error(err));

        return this
    }
    #API_KEY = "";
    request = (method = 'GET', endpoint, data = {}) => {
        const req = {
            method: method,
            headers: {
                'yaris-authentication': this.#API_KEY
            },
        }
        if (method == 'POST') req.body = JSON.stringify(data);

        return fetch('https://api.yaris.rocks/v1/' + endpoint, req)
    }
    addUser = (data) => {
        return this.request('POST', 'adduser', data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return data.error.message;
        })
    }
    removeUser(data) {
        return this.request('POST', 'removeuser', data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return data.error.message;
        })
    }
    getUser(tag) {
        return this.request('POST', `getuser/${tag}`, data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return data.error.message;
        })
    }
    whitelistUser(data) {
        return this.request('POST', 'whitelistuser', data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return data.error.message;
        })
    }
    blacklistUser(data) {
        return this.request('POST', 'blacklistuser', data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return data.error.message;
        })
    }
    addKey(data = {}) {
        return this.request('POST', 'addkey', data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return data.error.message;
        })
    }
    removeKey(data) {
        return this.request('POST', 'removekey', data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return data.error.message;
        })
    }
}