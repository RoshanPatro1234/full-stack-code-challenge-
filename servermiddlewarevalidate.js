const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', { host: 'localhost', dialect: 'postgres' });

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING(400) },
  role: { type: DataTypes.ENUM('ADMIN', 'USER', 'STORE_OWNER'), defaultValue: 'USER' }
});

const Rating = sequelize.define('Rating', {
  rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
  userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  storeId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } }
});

User.hasMany(Rating, { as: 'givenRatings', foreignKey: 'userId' });
User.hasMany(Rating, { as: 'receivedRatings', foreignKey: 'storeId' });

module.exports = { sequelize, User, Rating };