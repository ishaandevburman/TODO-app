
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_manager', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Task = sequelize.define('task', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  createdAt: { 
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: { 
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = { sequelize, Task };
