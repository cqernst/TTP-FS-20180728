const router = require('express').Router();
const Transaction = require('../db/models/Transaction');
const User = require('../db/models/User');
const axios = require('axios');

module.exports = router;

router.post('/', async (req, res, next) => {
  console.log('got in');
  console.log('req.body', req.body);
  try {
    //retrieve the stock's current price from IEX
    const priceResponse = await axios.get(
      `https://api.iextrading.com/1.0/stock/${req.body.stock_symbol}/price`
    );
    //the price comes back as a string, so coerce to a number
    const price = Number(priceResponse.data);

    /*get the user's balance to make sure they have enough to
    complete the transaction*/
    const user = await User.findById(req.body.userId);
    //the balance comes back as a string, so coerce to a number
    let balance = Number(user.balance);

    let quantity = req.body.quantity;

    if (balance > price * quantity) {
      //set the price equal to the current price to be saved in our db
      req.body.price = price;

      const transaction = await Transaction.create(req.body);

      //if we are successful in instantiating a new transaction, update user's balance
      balance = balance - price * quantity;
      await user.update({ balance: balance });

      //send the new transaction back to the front end
      res.json(transaction);
    } else {
      res.send(
        'You do not have enough money in your account to complete this transaction'
      );
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.params.userId },
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});
