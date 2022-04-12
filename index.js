const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = class Yaris {
    constructor(API_KEY) {
        this.#API_KEY = API_KEY;

        this.request('POST', 'info', {}).then(res => res.json()).then(data => {
            if (data && data.information) {
                this.#INFORMATION = data.information;
            } else throw new Error('[Yaris-Wrapper] new constructor error: ' + data.error.message);
        }).catch(err => console.error(err));

        return this
    }
    #API_KEY = "";
    #INFORMATION;
    getInfo() {
        return new Promise((resolve, _) => {
            setInterval(() => {
                if (this.#INFORMATION) {
                    resolve(this.#INFORMATION)
                }
            }, 100)
        })
    }
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
            else return { success: false, error: data.error.message };
        })
    }
    removeUser(hwid) {
        return this.request('POST', 'removeuser', { data: hwid }).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
    }
    getUser(tag) {
        return this.request('POST', `getuser/${tag}`, {}).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
    }
    whitelistUser(hwid) {
        return this.request('POST', 'whitelistuser', { data: hwid }).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
    }
    blacklistUser(hwid) {
        return this.request('POST', 'blacklistuser', { data: hwid }).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
    }
    addKey(data = {}) {
        return this.request('POST', 'addkey', data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
    }
    removeKey(key) {
        return this.request('POST', 'removekey', { key: key }).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
    }
}