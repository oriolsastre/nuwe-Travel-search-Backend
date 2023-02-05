require("dotenv").config({ path:__dirname+'/./../../.env'})

const expressConfig = {
    host: process.env.EXPRESS_HOST || 'localhost',
    port: process.env.EXPRESS_PORT || 3000
}

const mysqlConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || null,
    password: process.env.MYSQL_PASSWORD || null,
    name: process.env.MYSQL_NAME || 'vueling-nuwe-osr'
}

module.exports = { expressConfig, mysqlConfig }