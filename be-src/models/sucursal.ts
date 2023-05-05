import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Sucursal extends Model {}
Sucursal.init(
  {
    nombre: { type: DataTypes.STRING },
    sucursal_id: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "sucursal" }
);
