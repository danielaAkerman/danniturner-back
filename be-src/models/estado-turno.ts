import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class EstadoTurno extends Model {}
EstadoTurno.init(
  {
    nombre: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "estado_turno" }
);
