const { Router } = require('express');
const router = new Router();
const multer = require('multer');
const login = require('../middleware/login');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const ProdutosController = require('../controllers/produto.controller');


router.get('/', ProdutosController.getProdutos);

router.post('/', login.obrigatorio, upload.single('produto_imagem'), ProdutosController.postProdutos);

router.get('/:id_produto', ProdutosController.getUmProduto);

router.patch('/', login.obrigatorio, ProdutosController.updateProduto);

router.delete('/', login.obrigatorio, ProdutosController.deleteProduto);

module.exports = router;
