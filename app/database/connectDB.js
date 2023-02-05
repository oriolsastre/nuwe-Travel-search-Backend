const Sequelize = require('sequelize')
const { mysqlConfig } = require('../config/config');

const sequelize = new Sequelize(mysqlConfig.name, mysqlConfig.user, mysqlConfig.password, {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql',
    logging: false,
    sync: { force: false }
})

sequelize.sync({force:false})

module.exports = { sequelize }