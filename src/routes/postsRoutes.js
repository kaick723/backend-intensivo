import 'dotenv-config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const router = express.Router();

// Use `corsOptions` aqui
router.use(cors(corsOptions));

// Rota GET para listar posts
router.get('/posts', listarPosts);

// Rota POST para criar um novo post
router.post('/posts', postarNovoPost);

// Rota POST para upload de imagem
router.post("/upload", upload.single('imagem'), uploadImagem);

router.put("/upload/:id", atualizarNovoPost);

export default (app) => {
    app.use(router);
};
