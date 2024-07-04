const Database = require("../database/connection");
class CategoryController extends Database {

    // Método para criar uma nova categoria
    async create(req, res) {
        const { name } = req.body;
        try {
            const result = await this.query(
                'INSERT INTO categories (name) VALUES ($1) RETURNING *',
                [name]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar uma nova categoria' });
        }
    }

    // Método para excluir uma categoria
    async delete(req, res) {
        const { id } = req.params;
        try {
            const result = await this.query(
                'DELETE FROM categories WHERE id = $1 RETURNING *',
                [id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Categoria não encontrado' });
            }
            res.status(200).json({ message: 'Categoria deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar a categoria' });
        }
    }
}

module.exports = CategoryController