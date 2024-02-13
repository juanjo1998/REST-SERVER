const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.usersAuthPath = '/api/auth';

        // Conectar a base de datos
        this.connectDb();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.usersAuthPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on port: ${this.port}`);
        });
    }

}

module.exports = Server;
