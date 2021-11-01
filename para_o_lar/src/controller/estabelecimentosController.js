const models = require('../models/estabelecimentos.json');

const getAll = (req, res) => {
    const { pagamento, bairro, delivery, likes } = req.query

    let filtrados = models

    //filtrando por pagamento
    if (pagamento){
        filtrados = filtrados.filter(estabelecimento => {
            return estabelecimento.pagamento.includes(pagamento)
        })
    }

    //filtrando por bairro
    if (bairro){
        filtrados = filtrados.filter(estabelecimento =>{
            return estabelecimento.bairro == bairro
        })
    }
    //filtrando por delivery
    if(delivery) {
        filtrados = filtrados.filter(estabelecimento =>{
            return estabelecimento.delivery == (delivery == 'true' ? true : false)
        })
    }
    res.status(200).send(filtrados)
}

const getId = (req, res) => {
    const idSolicitado = req.params.id
    const found = models.find(estabelecimento => estabelecimento.id == idSolicitado)

    if(found == undefined){
        res.status(404).send({message: "Estabelecimento não encontrado"})
    }

    res.status(200).send(found)

}

module.exports = {
    getAll,
    getId
}