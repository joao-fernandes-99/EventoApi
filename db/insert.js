
const models = require('../models')

async function insert(){
    
    const eventoNode = await models.evento.create({nome: 'Evento de NodeJS'})
    const eventoPostgres = await models.evento.create({nome: 'BootCamp Postgres'})

    const joao = await models.participante.create({nome :'João Guilherme Fernandes'})
    const isabela = await models.participante.create({nome:'Isabela'})
    const isis = await models.participante.create({nome: 'Isis'})

    await eventoNode.setParticipantes(joao)
    //await eventoPostgres.setParticipantes({isabela, isis, joao})
    
    await models.sequelize.close()

    console.log('Dados Inseridos com sucesso!!!')


}
insert()