const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'SEU_USUARIO', 'SUA_SENHA',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;