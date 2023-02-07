module.exports = (sequelize, DataTypes) => {
    const Portfolio = sequelize.define("Portfolio", {
        Id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        ClientId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        ShareId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ShareSize: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TotalPrice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
    });
  
    return Portfolio;
  };