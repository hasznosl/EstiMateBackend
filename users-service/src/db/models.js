import { DataTypes, Model } from "sequelize";

import sequelize from "./connection";

export class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
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
  },
  {
    defaultScope: {
      rawAttributes: {
        exclude: ["passwordHash"],
      },
    },
    modelName: "users",
    sequelize,
  }
);

export class UserSession extends Model {}

UserSession.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    userId: {
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
      type: DataTypes.UUID,
    },
    expiresAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    modelName: "userSessions",
    paranoid: false,
    sequelize,
    updatedAt: false,
  }
);
