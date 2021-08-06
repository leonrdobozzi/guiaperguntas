//Isso é um model

const Sequelize  = require('sequelize');
//Conexão do banco
const connection = require('./database');
//Define: cria a tabela
//Dentro do objeto é definido suas colunas e as configurações delas
const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
},{});

//Sincronizando com o banco de dados, se ja existir n cria, se n existir cria.
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;