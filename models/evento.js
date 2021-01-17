const Sequelize = require('sequelize')
const sequelize = require('../db/_database')

const Evento = sequelize.define('eventos',{

    nome: {
        type: Sequelize.STRING
        },

});

module.exports = Evento
const Participante = require('./participante')

Evento.belongsToMany(Participante, {through:'evento_participante'});