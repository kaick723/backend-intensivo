import express from 'express';
import routes from './src/routes/postsRoutes.js'; // Certifique-se de que o caminho está correto

const app = express();

app.use(express.static("uploads"))

// Middleware para parsear JSON
app.use(express.json());

// Utiliza as rotas definidas em 'postsRoutes.js'
routes(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



