import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Especialidad extends Model {}
Especialidad.init(
  {
    nombre: { type: DataTypes.STRING },
    estado_especialidad_id: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "especialidad" }
);
