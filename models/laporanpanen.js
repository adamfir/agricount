'use strict';
module.exports = (sequelize, DataTypes) => {
  const LaporanPanen = sequelize.define('LaporanPanen', {
    jumlahBuah: DataTypes.INTEGER,
    tanggal: DataTypes.DATEONLY
  }, {
    scopes:{
      withoutTimestamp:{
        attributes:{
          exclude: 'createdAt updatedAt'
        }
      }
    }
  });
  LaporanPanen.associate = function(models) {
    // associations can be defined here
  };
  return LaporanPanen;
};