const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class Yaris {
    constructor(API_KEY) {
        this.#API_KEY = API_KEY;

        this.#request('POST', 'info', {}).then(data => {
            if (!data.error) {
                this.#INFORMATION = data;
            } else throw new Error('[Yaris-Wrapper] new constructor error: ' + data.error);
        }).catch(err => { throw err });

        return this
    }
    #API_KEY = "";
    #INFORMATION;
    #request = (method = 'GET', endpoint, data = {}) => {
        const req = {
            method: method,
            headers: {
                'yaris-authentication': this.#API_KEY
            },
        }
        if (method == 'POST') req.body = JSON.stringify(data);

        return new Promise(resolve => {
            fetch('https://api.yaris.rocks/v1/' + endpoint, req).then(res => res.json()).then(data => {
                if (data.success || data.information) resolve(data.information);
                else resolve({ success: false, error: data.error });
            }) 
        })
    }
    getInfo(callback) {
        const info =  new Promise((resolve, _) => {
            const interval = setInterval(() => {
                if (this.#INFORMATION) {
                    clearInterval(interval)
                    resolve(this.#INFORMATION)
                }
            }, 10)
        })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    addUser = async (data, callback) => {
        const info = this.#request('POST', 'adduser', data)
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    removeUser = async (data, callback) => {
        const info = this.#request('POST', 'removeuser', data)
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    getUser = async (tag, callback) => {
        const info = this.#request('POST', 'getuser', { tag: tag })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    editUser = async (data, callback) => {
        const info = this.#request('POST', 'edituser', data)
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    whitelistUser = async (data, callback) => {
        const info = this.#request('POST', 'whitelistuser', data)
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    blacklistUser = async (data, callback) => {
        const info = this.#request('POST', 'blacklistuser', data)
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    addKey = async (callback) => {
        const info = this.#request('POST', 'addkey')
        if (callback) {
            console.log(callback)
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
    removeKey = async (key, callback) => {
        const info = this.#request('POST', 'removekey', { key: key })
        if (callback) {
            info.then(data => callback(data)).catch(err => console.error(err))
        } else return info;
    }
}

Yaris.login = (API_KEY) => new Yaris(API_KEY);

module.exports = Yaris;
exports = module.exports;