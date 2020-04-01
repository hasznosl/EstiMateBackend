module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "settings",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      financial_goal_value: {
        allowNull: false,
        type: DataTypes.STRING
      },
      financial_goal_date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      birth_day: {
        allowNull: false,
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {
      charset: "utf8"
    }
  );
};

module.exports.down = queryInterface => queryInterface.dropTable("settings");
