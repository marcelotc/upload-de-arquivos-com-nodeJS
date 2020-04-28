const { Router } = require('express');

const router = new Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de produtos'
    });
});

router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }

    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de produtos',
        produtoCriado: produto
    });
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;

    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'id exdpcial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'você passou um ID'
        })
    }
});

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de produtos'
    });
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de produtos'
    });
});

module.exports = router;
