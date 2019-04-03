'use strict';
module.exports = (sequelize, DataTypes) => {
  const parameter = sequelize.define('parameter', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {
    scopes:{
      valueOnly:{
        attributes:['value']
      }
    }
  });
  parameter.associate = function(models) {
    // associations can be defined here
  };
  return parameter;
};