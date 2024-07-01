const Database = require("../database/connection");
class ClientController extends Database {

    // Método para criar um novo usuário
    async create(req, res) {
        const { name, email, cpf, contact } = req.body;
        try {
            const result = await this.query(
                'INSERT INTO clients (name, email, cpf, contact) VALUES ($1, $2, $3, $4) RETURNING *',
                [name, email, cpf, contact]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar um usuário' });
        }
    }
}


module.exports = ClientController