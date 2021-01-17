const models = require('../models')

const pesquisaTodos = async () =>{
    const result = await models.participante.findAll();
    return result
}

const pesquisaPorId = async (id) =>{
    const result = await models.participante.findByPk(id);
    return result
}

const participanteRoute = (app) =>{
    app.route('/participante/:id?')
        .get(async (req, res) => {
            if(req.params.id != null){
                const participante = await pesquisaPorId(req.params.id);
                return res.status(200).send(participante)
            }

            const participantes = await pesquisaTodos();
            return res.status(200).send(participantes)
        })
        .post(async (req,res)=>{
            if(req.body.nome != null){
                const participanteInsert = await models.participante.create(
                        {nome: req.body.nome}
                    )
                return res.status(201).send('Participante criado com sucesso.........')
            }else{
                return res.status(400).send('Parametro Nome não pode ser nulo......')
            }
        })
        .delete(async (req, res)=>{
            if(req.params.id != null){
                const participante = await pesquisaPorId(req.params.id);
                if(participante != null){
                    const deleteParticipante = await models.participante.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    return res.status(200).send('Participante deletado com sucesso')
                }else{
                    return res.status(404).send('Participante não encontrado.....')
                }
            }else{
                return res.status(400).send('É nescessario informar o ID........')
            }
        })
        .put(async(req, res) => {
            if(req.params.id != null){
                const participante = await pesquisaPorId(req.params.id);
                if(participante != null){
                    if(req.body.nome != null){
                        const updateParticipante = await models.participante.update({
                            nome: req.body.nome
                        },
                        {
                            where: {
                                id: req.params.id
                            }
                        })
                        return res.status(200).send('Participante atualizado com sucesso.....')
                    }else{
                        return res.status(400).send('O campo Nome não pode ser nulo......')
                    }
                }else{
                    return res.status(404).send('Participante não encontrado.......')
                }
            }else{
                return res.status(400).send('É nescessario informar o ID.......')
            }
        })
        
}


module.exports = participanteRoute