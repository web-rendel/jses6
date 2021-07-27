const { resolve } = require("../webpack.config");

async function start() {
    return await resolve('async is working')
}

start().then(console.log)