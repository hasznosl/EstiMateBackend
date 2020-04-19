module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "users",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      passwordHash: {
        allowNull: false,
        type: DataTypes.CHAR(64),
      },
      financial_goal_value: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      financial_goal_date: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      birth_day: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) =>
  queryInterface.dropTable("users");
