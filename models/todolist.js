'use strict';
module.exports = function(sequelize, DataTypes) {
  var todolist = sequelize.define('todolist', {
    todo: DataTypes.STRING,
    description: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    completed_at: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return todolist;
};
