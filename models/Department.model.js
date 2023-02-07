module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define("Department", {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      DepartmentName: {
        type: DataTypes.STRING,
        allowNull: false
      }
  });

  return Department;
};
