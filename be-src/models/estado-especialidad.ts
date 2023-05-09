import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class EstadoEspecialidad extends Model {}
EstadoEspecialidad.init(
  {
    nombre: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "estado_especialidad" }
);
