'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    newsletter: DataTypes.BOOLEAN,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};