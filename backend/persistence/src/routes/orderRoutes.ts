import { Router } from 'express';
import { prisma } from '..';
import { OrderState } from '../generated/prisma';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: [{ id: 'asc' }],
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, state } = req.body;
    console.log('POST', title, description, state);

    // Validation
    if (!Object.values(OrderState).includes(state)) {
      res.status(400).json({ message: 'Invalid order state' });
      return;
    }

    // Create Order
    const order = await prisma.order.create({
      data: {
        title,
        description,
        state: state as OrderState,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await prisma.order.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedOrder);
  } catch (error: any) {
    console.error('Error creating order:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, state } = req.body;

    // Validation
    if (!Object.values(OrderState).includes(state)) {
      res.status(400).json({ message: 'Invalid order state' });
      return;
    }

    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        state,
      },
    });

    res.status(200).json(updatedOrder);
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
