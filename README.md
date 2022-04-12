# Hello, this is a Yaris API wrapper for JS

I did not make yaris. the yaris discord server is [here](https://discord.gg/yaris/). Please support them!

to install:
```sh
npm install yaris-wrapper
```

to get started:
```js
import Yaris from "yaris-wrapper";
```
```js
const Yaris = require("yaris-wrapper");
```

define a new connection:
```js
const yaris = new Yaris("API_KEY")
```

## list of commands:

- addUser
- removeUser
- getUser
- whitelistUser
- blacklistUser
- addKey
- removeKey

## example script:

```js
import Yaris from "yaris-wrapper";

const yaris = Yaris.new("API_THING")

console.log(yaris.Information) // gets information about your whitelist

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