// src/models/User.js

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      tableName: 'users',
      underscored: true,
      timestamps: false,
    });

    User.associate = (models) => {
      User.hasMany(models.BlogPost, {
        foreignKey: 'user_id',
        as: 'users',
      });
    };
  
  
    return User;
  };
  