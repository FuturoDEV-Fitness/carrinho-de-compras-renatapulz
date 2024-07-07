const Database = require("../database/connection");

class OrdersController extends Database {

    // Método para criar um pedido (se não existir) ou adicionar itens a um pedido existente
    async create(req, res) {
        const { client_id, items, address, observations } = req.body;

        try {
            // Verifica se já existe um pedido para aquele usuário
            let orderId = await this.getCurrentOrderId(client_id);

            if (!orderId) {
                // Se não existir, cria um novo pedido
                const orderResult = await this.query(
                    'INSERT INTO orders (client_id, total, address, observations) VALUES ($1, $2, $3, $4) RETURNING id',
                    [client_id, 0, address, observations]
                );
                orderId = orderResult.rows[0].id;
            }

            // Insere itens na tabela 'order_items'
            for (let item of items) {
                await this.query(
                    'INSERT INTO order_items (order_id, product_id, amount, price) VALUES ($1, $2, $3, $4)',
                    [orderId, item.product_id, item.amount, item.price]
                );
            }

            // Recalcula o novo total do pedido
            const totalResult = await this.query(
                'SELECT COALESCE(SUM(price * amount), 0) AS total FROM order_items WHERE order_id = $1',
                [orderId]
            );
            const total = parseFloat(totalResult.rows[0].total);

            // Atualiza o pedido com o novo total calculado
            await this.query(
                'UPDATE orders SET total = $1 WHERE id = $2',
                [total, orderId]
            );

            res.status(200).json({ message: 'Pedido criado/atualizado com sucesso', orderId, total });
        } catch (error) {
            res.status(500).json({ error: 'Erro na criação/atualização do pedido', details: error.message });
        }
    }

    // Método para deletar um pedido (e seus itens associados)
    async delete(req, res) {
        const orderId = req.params.id;

        try {
            // Verifica se o pedido existe
            const orderExists = await this.orderExists(orderId);
            if (!orderExists) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }

            // Deleta itens do pedido na tabela 'order_items'
            await this.query(
                'DELETE FROM order_items WHERE order_id = $1',
                [orderId]
            );

            // Deleta o pedido na tabela 'orders'
            await this.query(
                'DELETE FROM orders WHERE id = $1',
                [orderId]
            );

            res.status(200).json({ message: 'Pedido deletado com sucesso', orderId });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o pedido', details: error.message });
        }
    }

    // Método para obter o ID do pedido existente de um usuário
    async getCurrentOrderId(client_id) {
        const result = await this.query(
            'SELECT id FROM orders WHERE client_id = $1 AND total >= 0 ORDER BY id DESC LIMIT 1',
            [client_id]
        );
        return result.rows.length > 0 ? result.rows[0].id : null;
    }

    // Método para verificar se o pedido existe
    async orderExists(orderId) {
        const result = await this.query(
            'SELECT id FROM orders WHERE id = $1',
            [orderId]
        );
        return result.rows.length > 0;
    }
}

module.exports = OrdersController