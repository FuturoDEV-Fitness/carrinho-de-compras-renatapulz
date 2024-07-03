const Database = require("../database/connection");
class ProductController extends Database {

    // Método para cadastrar um novo produto
    async create(req, res) {
        const { name, amount, color, voltage, description, category_id } = req.body;
        if (!name || !category_id) {
            return res.status(400).json({ error: 'Nome e categoria são campos obrigatórios' });
        }
        try {
            const result = await this.query(
            'INSERT INTO products (name, amount, color, voltage, description, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, amount, color, voltage, description, category_id]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao cadastrar um produto' });
        }
    }

    // Método para buscar todos os produtos
    async getAll(req, res) {
        try {
            const result = await this.query('SELECT * FROM products');
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar os produtos' });
        }
    }
    
    // Método para buscar um produto por ID
    async getById(req, res) {
        const { id } = req.params;
        try {
            const result = await this.query('SELECT * FROM products WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar o produto' });
        }
    }

     // Método para atualizar um produto
     async update(req, res) {
        const { id } = req.params;
        const { name, amount, color, voltage, description, category_id } = req.body;
        try {
            const result = await this.query(
                'UPDATE products SET name = $1, amount = $2, color = $3, voltage = $4, description = $5, category_id = $6 WHERE id = $7 RETURNING *',
                [name, amount, color, voltage, description, category_id, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar o produto' });
        }
    }

    // Método para deletar um produto
    async delete(req, res) {
        const { id } = req.params;
        try {
            const result = await this.query(
                'DELETE FROM products WHERE id = $1 RETURNING *',
                [id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o produto' });
        }
    }
}

module.exports = ProductController