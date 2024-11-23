import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from 'fs';

// Função para listar todos os posts
export async function listarPosts(req, res) {
    try {
        const posts = await getTodosPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar os posts', error });
    }
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ 'Erro': 'Falha na requisição' });
    }
}

// Função para fazer upload de imagem
export async function uploadImagem(req, res) {
    try {
        const arquivo = req.file; // Obtém o arquivo carregado

        // Dados para salvar no banco de dados
        const detalhesArquivo = {
            originalname: arquivo.originalname,
            mimetype: arquivo.mimetype,
            size: arquivo.size,
            path: arquivo.path
        };

        // Função criarPost para salvar os detalhes do arquivo no banco de dados
        const resultado = await criarPost(detalhesArquivo);

        // Gera o novo nome da imagem usando o ID do post
        const imagemAtualizada = `uploads/${resultado._id}.png`;

        // Renomeia o arquivo para usar o ID como nome
        fs.renameSync(req.file.path, imagemAtualizada);

        // Atualiza o caminho no objeto resultado para refletir o novo nome da imagem
        resultado.path = imagemAtualizada;

        // Retorna detalhes do arquivo salvo no banco de dados
        res.status(200).json(resultado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ 'Erro': 'Falha na requisição' });
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    const post = {
        imgUrl: urlImagem,
        descricao: req.body.descricao,
        alt: req.body.alt
    }
    try {
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ 'Erro': 'Falha na requisição' });
    }
}
