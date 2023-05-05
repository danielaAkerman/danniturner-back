import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Negocio extends Model {}
Negocio.init(
  {
    nombre: { type: DataTypes.STRING },
    sucursal_id: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "negocio" }
);
