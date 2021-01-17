const Sequelize = require('sequelize')
const sequelize = require('../db/_database')

const Participante = sequelize.define('participantes',{

    nome: {
        type: Sequelize.STRING
    },
});

module.exports = Participante

const Evento = require('./evento')

Participante.belongsToMany(Evento, {through: 'evento_participante'})