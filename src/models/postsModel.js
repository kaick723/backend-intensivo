import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

let conexao; // Variável global para armazenar a conexão

async function inicializarConexao() {
    try {
        conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
        console.log('Conectado ao banco de dados');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados', error);
        process.exit();
    }
}

await inicializarConexao();

export async function getTodosPosts() {
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts");
    const resultado = await colecao.insertOne(novoPost);
    return {
        ...novoPost,
        _id: resultado.insertedId
    }; // Retorna o novo post junto com seu ID
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}