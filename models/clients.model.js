module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("Users", {
        Id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        WalletBalance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    });
  
    return User;
  };