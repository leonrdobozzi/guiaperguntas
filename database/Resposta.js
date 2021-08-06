const Sequelize  = require('sequelize');
//Conexão do banco
const connection = require('./database');

const Resposta = connection.define('respostas',{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force:false});

module.exports = Resposta;