module.exports = (sequelize, DataTypes) => {
    const Share = sequelize.define("Shares", {
        Id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        ShareCode: {
            type: DataTypes.STRING(3),
            allowNull: false,
            unique: true
        },
        Price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        LastUpdateDate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });
  
    return Share;
  };