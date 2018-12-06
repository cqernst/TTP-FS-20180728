const router = require('express').Router();
const Transaction = require('../db/models/Transaction');

module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.json(transaction);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({ where: { userId } });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});



