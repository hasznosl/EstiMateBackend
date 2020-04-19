import { DataTypes, Model } from "sequelize";

import sequelize from "./connection";

export class Account extends Model {}

Account.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    name: {
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
    deterioration_constant: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "accounts",
    paranoid: false,
    sequelize,
    updatedAt: false,
  }
);

export class Transaction extends Model {}

Transaction.init(
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
  },
  {
    modelName: "transactions",
    paranoid: false,
    sequelize,
    updatedAt: false,
  }
);
