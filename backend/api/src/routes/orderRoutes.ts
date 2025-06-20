import { Request, Router } from 'express';
import { http } from '../services/http';
import logger, { errorLogger } from '../logger/logger';

const router = Router();
const ORDER_PERSISTENCE_URL =
  process.env.PERSISTENCE_URL + '/persistence/orders';

router.get('/', async (req, res) => {
  const requestID = req.requestID;
  try {
    logger.info('Load all orders from persistence service', {
      requestID,
    });
    const orders = await http.get(ORDER_PERSISTENCE_URL, requestID);
    console.log('REQUESTID', req.headers['x-request-id']);
    res.status(200).json(orders);
  } catch (error: any) {
    errorLogger(
      'Failed to load all orders from persistence service',
      error,
      requestID,
    );
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const requestID = req.requestID;
  try {
    logger.info('Request creating new order in persistence service', {
      requestID,
    });
    const newOrder = await http.post(
      ORDER_PERSISTENCE_URL,
      req.body,
      requestID,
    );
    res.status(201).json(newOrder);
  } catch (error) {
    errorLogger('Failed to create new order', error, requestID);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const requestID = req.requestID;
  const { id } = req.params;
  try {
    logger.info(`Request delete order #${id} in persistence service`, {
      requestID,
    });
    const deletedOrder = await http.delete(
      `${ORDER_PERSISTENCE_URL}/${id}`,
      requestID,
    );
    res.status(200).json(deletedOrder);
  } catch (error: any) {
    errorLogger(`Failed to delete order #${id}`, error, requestID);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const requestID = req.requestID;
  const { id } = req.params;
  try {
    logger.info(`Request update order #${id} in persistence service`, {
      requestID,
    });
    const updatedOrder = await http.put(
      `${ORDER_PERSISTENCE_URL}/${id}`,
      req.body,
      requestID,
    );
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    errorLogger(`Failed to update order #${id}`, error, requestID);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
