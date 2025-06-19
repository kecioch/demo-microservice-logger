import { Router } from 'express';
import { http } from '../services/http';

const router = Router();
const ORDER_PERSISTENCE_URL =
  process.env.PERSISTENCE_URL + '/persistence/orders';

router.get('/', async (req, res) => {
  try {
    console.log('GET /api/orders');
    const orders = await http.get(ORDER_PERSISTENCE_URL);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error loading orders from persistence:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('POST /api/orders');
    const newOrder = await http.post(ORDER_PERSISTENCE_URL, req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('DELETE /api/orders/' + id);
    const deletedOrder = await http.delete(`${ORDER_PERSISTENCE_URL}/${id}`);
    res.status(200).json(deletedOrder);
  } catch (error: any) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('PUT /api/orders/' + id);
    const updatedOrder = await http.put(
      `${ORDER_PERSISTENCE_URL}/${id}`,
      req.body,
    );
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
