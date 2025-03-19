module.exports = (sequelize, DataTypes) => {
    const Provider = sequelize.define('Provider', {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      npiNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Provider;
  };
  