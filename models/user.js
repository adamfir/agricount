'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    otoritas: DataTypes.STRING
  }, {
    scopes:{
      withoutPassword: {
        attributes: { exclude: ['password'] },
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};