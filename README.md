# Yaris API wrapper for Node.JS 

I did make this, but i did not make Yaris, the Yaris discord server is [here](https://discord.gg/qVBtSYXX72). Please support them!

to install:
```sh
npm install yaris-wrapper
```

to get started with ESM:
```js
import Yaris from "yaris-wrapper";
```
to get started with CommonJS:
```js
const Yaris = require("yaris-wrapper")
```

to define a new connection:
```js
const yaris = new Yaris("API_KEY")
```

---

# list of commands w/ examples:

## Important!
### when an api end point fails for some reason, maybe if you did removeKey and provided a wrong key, it will always return this:
```js
{
    success: false,
    error: {
        message: "error_message"
    }
}
```

### API.getInfo()
* gets whitelist info
```js
var info = await yaris.getInfo()

info = {
    id: "whitelist_id",
    owner: "user_id",
    name: "whitelist_name",
    description: "whitelist_description"
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
})

info = { // adds user successfully
    success: true,
    message: "Successfully added that user to your script."
}
```
### API.removeUser()
* removes a user from whitelist using their hwid
```js
var info = await yaris.removeUser("user_hwid")

info = { // removes user successfully
    success: true,
    message: "Successfully removed that user from your script."
}
```
### API.getUser()
* gets a users info w/ their tag
```js
var info = await yaris.getUser("user_tag")

info = { // successfully retrieved info
    success: true,
    message: "yes",
    additional: {
        tag: "user_tag",
        data: "user_hased_hwid",
        expires: "", // sets to never expire
        role: "user_role",
        blacklisted: "false", // if they are blacklisted or whitelisted
        reason: "" // for what reason (if blacklisted)
    }
}
```
### API.whitelistUser()
* whitelists a user using their user id
```js
var info = await yaris.whitelistUser("user_hwid")

info = { // successfully whitelised
    success: true,
    message: "Successfully whitelisted that user to your script."
}
```
### API.blacklistUser()
* blacklists a user using their user id
```js
var info = await yaris.blacklistUser("user_hwid")

info = { // successfully blacklisted
    success: true,
    message: "Successfully blacklisted that user from your script."
}
```
### API.addKey()
* generates a key for your whitelist
```js
var info = await yaris.addKey()

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
var info = await yaris.removeKey("key")

info = { // successfully removed specified key
    success: true,
    message: "Successfully removed that key from your script."
}
```

---
# Example scripts

## example script with ESM:

```js
import Yaris from "yaris-wrapper";

const yaris = Yaris.new("API_THING")

yaris.getInfo().then(console.log) // gets information about your whitelist

yaris.addUser({
    tag: "ExampleTag",
    data: "hwid",
    expires: "", // never expires if empty
    role: "user"
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

        yaris.whitelistUser("hwid").then(data => { // whitelists a user with hwid
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

## example script with CommonJS:

```js
const Yaris = require("yaris-wrapper")

const yaris = Yaris.new("API_THING")

yaris.getInfo().then(console.log) // gets information about your whitelist

const main = async () => {
    const addUserData = await yaris.addUser({
        tag: "ExampleTag",
        data: "hwid",
        expires: "", // never expires if empty
        role: "user"
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

        const whitelistData = await yaris.whitelistUser("hwid")

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