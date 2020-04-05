import { DataTypes, Model } from "sequelize";

import sequelize from "./connection";

export class User extends Model {}

User.init(
  {
    name: {
      allowNull: false,
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
      allowNull: false,
      type: DataTypes.STRING,
    },
    financial_goal_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    birth_day: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    modelName: "users",
    sequelize,
  }
);
