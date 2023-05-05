import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class User extends Model {}
User.init(
  {
    fullname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    pet_id: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "user" }
);
