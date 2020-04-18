module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "transactions",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      accountId: {
        allowNull: false,
        references: {
          key: "id",
          model: "accounts",
        },
        type: DataTypes.UUID,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      value: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      currency: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      currency_default_exchange_rate: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
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
  queryInterface.dropTable("transactions");
