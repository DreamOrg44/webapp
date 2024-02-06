'use strict';

module.exports = (sequelize, DataTypes) => {
  const HealthCheck = sequelize.define('HealthCheck', {
  });

  return HealthCheck;
};
