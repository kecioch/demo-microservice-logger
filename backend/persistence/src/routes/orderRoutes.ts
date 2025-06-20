import { Router } from 'express';
import { prisma } from '..';
import { OrderState } from '../generated/prisma';
import logger, { errorLogger } from '../logger/logger';

const router = Router();

router.get('/', async (req, res) => {
  const requestID = req.headers['x-request-id'];
  try {
    const orders = await prisma.order.findMany({
      orderBy: [{ id: 'asc' }],
    });
    logger.info('Orders loaded from database successfully', {
      requestID,
    });
    res.status(200).json(orders);
  } catch (error) {
    errorLogger('Failed to load orders from database', error, requestID);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const requestID = req.headers['x-request-id'];
  try {
    const { title, description, state } = req.body;

    // Validation
    if (!Object.values(OrderState).includes(state)) {
      res.status(400).json({ message: 'Invalid order state' });
      logger.error('Failed to create new order. Invalid order state', {
        requestID,
      });
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

    logger.info('Created new order in database successfully', {
      order,
      requestID,
    });
    res.status(201).json(order);
  } catch (error) {
    errorLogger('Failed to create new order', error, requestID);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const requestID = req.headers['x-request-id'];
  const { id } = req.params;
  try {
    const deletedOrder = await prisma.order.delete({
      where: { id: Number(id) },
    });
    logger.info(`Successfully deleted order #${id} from database`, {
      requestID,
    });
    res.status(200).json(deletedOrder);
  } catch (error: any) {
    if (error.code === 'P2025') {
      logger.error(`Failed to delete Order #${id}. Order not found`, {
        requestID,
      });
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    errorLogger(`Failed to delete order #${id}`, error, requestID);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const requestID = req.headers['x-request-id'];
  const { id } = req.params;
  try {
    const { title, description, state } = req.body;
    // Validation
    if (!Object.values(OrderState).includes(state)) {
      res.status(400).json({ message: 'Invalid order state' });
      logger.error(`Failed to update order #${id}. Invalid order state`, {
        requestID,
      });
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

    logger.info(`Updatet order #${id} in database successfully`, {
      updatedOrder,
      requestID,
    });
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    if (error.code === 'P2025') {
      logger.error(`Failed to update Order #${id}. Order not found`, {
        requestID,
      });
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    errorLogger(`Failed to update order #${id}`, error, requestID);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
