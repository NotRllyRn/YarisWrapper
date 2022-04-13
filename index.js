const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class Yaris {
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
    getInfo(callback) {
        const info =  new Promise((resolve, _) => {
            setInterval(() => {
                if (this.#INFORMATION) {
                    resolve(this.#INFORMATION)
                }
            }, 100)
        })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    addUser = async (data, callback) => {
        const info = this.request('POST', 'adduser', data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    removeUser = async (data, callback) => {
        const info = this.request('POST', 'removeuser', data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    getUser = async (tag, callback) => {
        const info = this.request('POST', `getuser/${tag}`, {}).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    whitelistUser = async (hwid, callback) => {
        const info = this.request('POST', 'whitelistuser', { data: hwid }).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    blacklistUser = async (hwid, reason, callback) => {
        const info = this.request('POST', 'blacklistuser', { data: hwid, reason: reason }).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    addKey = async (data = {}, callback) => {
        const info = this.request('POST', 'addkey', data).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    removeKey = async (key, callback) => {
        const info = this.request('POST', 'removekey', { key: key }).then(res => res.json()).then(data => {
            if (data && data.information) return data.information;
            else return { success: false, error: data.error.message };
        })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
}

Yaris.login = (API_KEY) => new Yaris(API_KEY);

module.exports = Yaris;
exports = module.exports;