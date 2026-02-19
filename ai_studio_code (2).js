const express = require('express');
const router = express.Router();
const { User, Rating, sequelize } = require('../models');

router.get('/stats', async (req, res) => {
  const userCount = await User.count({ where: { role: 'USER' } });
  const storeCount = await User.count({ where: { role: 'STORE_OWNER' } });
  const ratingCount = await Rating.count();
  res.json({ userCount, storeCount, ratingCount });
});

router.get('/users', async (req, res) => {
  const { sortBy, order, role } = req.query;
  const where = role ? { role } : {};
  const users = await User.findAll({
    where,
    order: [[sortBy || 'name', order || 'ASC']]
  });
  res.json(users);
});

module.exports = router;