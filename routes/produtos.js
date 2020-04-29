const { Router } = require('express');
const router = new Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    /*
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de produtos'
    });
    */
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM produtos;",
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({ response: resultado });
            }
        )
    });
});

router.post('/', (req, res, next) => {
    /*
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }
    */

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    })
});

router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM produtos WHERE id_produto = ?;",
            [req.params.id_produto],
                (error, resultado, fields) => {
            if(error) { return res.status(500).send({ error: error }) }

                res.status(201).send({ response: resultado });
        }
        )
    });
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Produto atualizado com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    })
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Produto deletado com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    })
});

module.exports = router;
