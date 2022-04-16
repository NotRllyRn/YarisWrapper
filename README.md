# Yaris API wrapper for Node.JS 

### Information:
This is a API wrapper for Yaris whitelisting system located [here](https://yaris.rocks/beta/). This is intended to help you use their API endpoint system without you hassling around with messy fetch code. Source code [here](https://github.com/NotRllyRn/YarisWrapper).

### Module compatablity:
This works in both ES6 Modules and CommonJS scripts. This module is asyncronous but has [callback support](#callbacks). You can either use the method `.then()` or `await`, which ever you prefer.

### Disclamer!
I did not make Yaris, this is simply an API wrapper for their service. The Yaris discord server is [here](https://discord.gg/qVBtSYXX72). Please support them!

---
## Table of contents:
- [To install and setup](#to-install)
- [To get started](#to-get-started)
- [List of commands](#list-of-commands-w-examples)
    - [getInfo](#apigetinfo)
    - [addUser](#apiadduser)
    - [removeUser](#apiremoveuser)
    - [getUser](#apigetuser)
    - [editUser](#apiedituser)
    - [whitelistUser](#apiwhitelistuser)
    - [blacklistUser](#apiblacklistuser)
    - [addKey](#apiaddkey)
    - [removeKey](#apiremovekey)
- [Usage](#example-usage)
    - [promises / ES6](#example-usage-with-es6)
    - [async await / CommonJS](#example-usage-with-commonjs)
---

### to install:
```sh
npm install yaris-wrapper
```
### to get started:
```js
// With ES6 modules
import Yaris from "yaris-wrapper";

// With CommonJS
const Yaris = require("yaris-wrapper")
```
### to define a new connection:
```js
// Using Classes
const yaris = new Yaris("API_KEY")

// Using login function
const yaris = Yaris.login("API_KEY")
```

---

# List of commands w/ examples:
## Important!
when an api end point fails for some reason, maybe if you requested removeKey and provided a wrong key, it will always return the Object below, applies to all endpoints.
```js
{
    success: false,
    error: {
        message: "error_message",
        code: "error_code"
    },
}
```
## Callbacks!
instead of using promises, you could actually use callbacks, each function has a callback for the last argument,
```js
yaris.getInfo((info) => { // add a callback for the 1st argument, since it doesn't take in any other arguments
    console.log(info)
})

yaris.blacklistUser("user_tag", "reason", (info) => { // callback on the last argument.
    if (info.success) {
        console.log(info) // successfully blacklisted
    } else {
        console.error(info.error.message) // failed to blacklist
    }
})
```
### API.getInfo()
* gets whitelist info
```js
var info = await yaris.getInfo(optional_callback)

info = {
    id: "whitelist_id", // whitelist's id
    owner: "user_id", // owner of whitelist's id
    name: "whitelist_name", // the whitelist name
    description: "whitelist_description" // the whitelist dicription
}
```
### API.addUser()
* adds a user to whitelist using hwid
```js
var info = await yaris.addUser({
    tag: "user_tag",
    data: "user_hwid",
    expires: "", // set to never expire
    role: "user_role", // could be anything
}, optional_callback)

info = { // adds user successfully
    success: true,
    message: "Successfully added that user to your script."
}
```
### API.removeUser()
* removes a user from whitelist using their hwid
```js
var info = await yaris.removeUser({
    tag: "user_tag", // uses user's tag
    data: "user_hwid", // or uses user's hwid
    hashed: false, // [OPTIONAL] change this accordingly to the data field.
}, optional_callback)

info = { // removes user successfully
    success: true,
    message: "Successfully removed that user from your script."
}
```
### API.getUser()
* gets a users info w/ their tag
```js
var info = await yaris.getUser("user_tag", optional_callback)

info = { // successfully retrieved info
    success: true,
    message: "yes",
    additional: {
        tag: "user_tag",
        data: "user_hashed_hwid",
        expires: "", // sets to never expire
        role: "user_role",
        blacklisted: "false", // if they are blacklisted or whitelisted
        reason: "" // for what reason (if blacklisted)
    }
}
```
### API.editUser()
* edits a users data using their hwid
```js
var info = await. yaris.editUser({
    data: "user_hwid", // unhashed or hashed
    hashed: false, // [OPTIONAL] change this accordingling to the data field.
    tag: "new_user_tag",   // [OPTIONAL]
    expires: "",           // [OPTIONAL]
    role: "new_user_role", // [OPTIONAL]
}, optional_callback)

info = { // successfully edited user.
    success: true,
    message: 'Successfully changed that users tag.'
}
```
### API.whitelistUser()
* whitelists a user using their user id
```js
var info = await yaris.whitelistUser({
    data: "user_hwid", // hashed or unhashed
    hashed: false, // [OPTIONAL] change this accordingling to the data field.
}, optional_callback)

info = { // successfully whitelised
    success: true,
    message: "Successfully whitelisted that user to your script."
}
```
### API.blacklistUser()
* blacklists a user using their user id w/ a reason (optional)
```js
var info = await yaris.blacklistUser(({
    data: "user_hwid", // hashed or unhashed
    reason: "", // [OPTIONAL]
    hashed: false, // [OPTIONAL] change this accordingling to the data field.
}, optional_callback)

info = { // successfully blacklisted
    success: true,
    message: "Successfully blacklisted that user from your script."
}
```
### API.addKey()
* generates a key for your whitelist
```js
var info = await yaris.addKey(optional_callback)

info = { // successfully generated a key
    success: true,
    message: "Successfully generated a key for your script.",
    additional: { 
        key: "generated_key"
    }
}
```
### API.removeKey()
* generates a key for your whitelist
```js
var info = await yaris.removeKey("key", optional_callback)

info = { // successfully removed specified key
    success: true,
    message: "Successfully removed that key from your script."
}
```

---

# Example Usage
## example usage with ES6:
* uses `import` instead of `require()`
* can be used asyncronously with `.then()` and `await`
```js
import Yaris from "yaris-wrapper"; // ES6 Modules only

const yaris = new Yaris("API_KEY")

yaris.getInfo().then(console.log) // gets information about your whitelist

yaris.addUser({
    tag: "user_tag",
    data: "user_hwid",
    expires: "", // never expires if empty
    role: "user_role" // can be anything
}).then(data => {
    if (data && data.success) {
        console.log(data) // successfully whitelisted
    } else {
        conse.error(data.error)
    }
});

yaris.getKey().then(data => { // adds a key
    if (data.success) {
        const key = data.additional.key // gets the key

        console.log(key)
        yaris.removeKey(key).then(data => { // removes the key
            if (data.success) {
                console.log(data.message) // the success message
            }
        });

        yaris.whitelistUser({
            data: "user_hwid",
        }).then(data => { // whitelists a user with hwid
            if (data.success) {
                console.log(data.message) // logs the success message
            } else {
                console.error(data.error)
            }
        });
    } else {
        console.error(data.error) // console.errors the error
    }
})
```

---

## example usage with CommonJS:
* uses `require()` instead of `import`
* can be used asyncronously with `.then()` and `await`
```js
const Yaris = require("yaris-wrapper") // CommonJS only

const yaris = new Yaris("API_KEY")

const main = async () => {
    const info = await yaris.getInfo() // gets information about your whitelist
    console.log(info)

    const addUserData = await yaris.addUser({
        tag: "user_tag",
        data: "user_hwid",
        expires: "", // never expires if empty
        role: "user_role" // can be anything
    })

    if (addUserData && addUserData.success) {
        console.log(addUserData) // successfully whitelisted
    } else {
        conse.error(addUserData.error)
    }

    const getKeyData = await yaris.getKey()

    if (getKeyData.success) {
        const key = getKeyData.additional.key // gets the key

        console.log(key)

        const removeKeyData = await yaris.removeKey(key)
        
        if (removeKeyData.success) {
            console.log(removeKeyData.message) // the success message
        }

        const whitelistData = await yaris.whitelistUser({
            data: "user_hwid",
        })

        if (whitelistData.success) {
            console.log(whitelistData.message) // logs the success message
        } else {
            console.error(whitelistData.error)
        }
    } else {
        console.error(getKeyData.error) // console.errors the error
    }
}
```

Thank you for using yaris-wrapper <3
- 
from [NotRllyRn](https://github.com/NotRllyRn)