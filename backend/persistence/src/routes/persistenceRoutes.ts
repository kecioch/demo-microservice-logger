import { Router } from 'express';
import { prisma } from '..';
import { OrderState } from '../generated/prisma';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
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

export default router;
