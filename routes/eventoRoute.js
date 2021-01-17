const models = require('../models')


const pesquisaTodos = async ()=> {
    const result = await models.evento.findAll();
    return result
}

const pesquisaPorId = async (id)=> {
    const result = await models.evento.findByPk(id);
    return result

}


const eventoRoute = (app) =>{
    app.route('/evento/:id?')
        .post((req, res) => {
            if(req.body.nome != null){
                let eventoInsert = models.evento.create({nome: req.body.nome})
            
                return res.status(201).send('Evento inserido com sucesso!!!')
            }
            
            return res.status(400).send('Parametro Nome não poder ser nulo!!!')

        })
        .get(async (req, res) => {

            if(req.params.id != null){
                const resultadoPesquisa = await pesquisaPorId(req.params.id);
                return res.status(200).send(resultadoPesquisa)
            }

            const resultadoPesquisa = await pesquisaTodos() 
            return res.status(200).send(resultadoPesquisa)
        })
        .delete(async (req,res)=> {
            if(req.params.id != null){
               const resultadoPesquisa = await pesquisaPorId(req.params.id);
               if(resultadoPesquisa != null){
                const deleteEvento = await models.evento.destroy({ 
                    where:{
                        id:req.params.id
                    }
                });
               return res.status(200).send('Evento Deletado com sucesso.....')
               }else{
                   return res.status(404).send('Evento não encontrado.......')
               }
            }else{
                return res.status(400).send('É nescessario informar o id.......')
            }

        })
        .put(async (req, res) =>{
            if(req.params.id != null){
                const evento = await pesquisaPorId(req.params.id);
                if(evento != null){
                    console.log(req.body);
                    if(req.body.nome != null){
                        const updateEvento = await models.evento.update({nome: req.body.nome},
                            {
                                where:{
                                    id: req.params.id
                                }
                            })
                            return res.status(200).send('Evento atualizado com sucesso')
                    }else{
                        return res.status(400).send('Campo nome não pode ser vazio......')
                    }
                }else{
                    return res.status(404).send('Evento não encontrado.......')
                }
            }else{
                return res.status(400).send('É nescessario informar o id.......')
            }

        })

}

module.exports = eventoRoute