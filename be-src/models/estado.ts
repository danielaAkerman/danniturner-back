import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Estado extends Model {}
Estado.init(
  {
    nombre: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "estado" }
);
