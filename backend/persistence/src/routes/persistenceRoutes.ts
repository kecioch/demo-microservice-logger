import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.status(200);
    res.send("Hello from GET Persistence !!!");
});

export default router;