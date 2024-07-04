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

    // Método para listar todos os usuários
    async getAll(req, res) {
        try {
            const result = await this.query('SELECT * FROM clients');
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os usuários' });
        }
    }

    // Método para buscar um usuário por ID
    async getById(req, res) {
        const { id } = req.params;
        try {
            const result = await this.query('SELECT * FROM clients WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar o usuário' });
        }
    }

    // Método para atualizar um usuário
    async update(req, res) {
        const { id } = req.params;
        const { name, email, cpf, contact } = req.body;
        try {
            const result = await this.query(
                'UPDATE clients SET name = $1, email = $2, cpf = $3, contact = $4 WHERE id = $5 RETURNING *',
                [name, email, cpf, contact, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar o usuário' });
        }
    }

    // Método para deletar um usuário
    async delete(req, res) {
        const { id } = req.params;
        try {
            const result = await this.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o usuário' });
        }
    }
}


module.exports = ClientController