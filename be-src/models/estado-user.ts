import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class EstadoUser extends Model {}
EstadoUser.init(
  {
    nombre: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "estado_user" }
);
