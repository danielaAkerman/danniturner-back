import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Turnos extends Model {}
Turnos.init(
  {
    especialidad_id: { type: DataTypes.INTEGER },
    prestador_id: { type: DataTypes.INTEGER },
    cliente_id: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER },
    estado_turno_id: { type: DataTypes.INTEGER },
    negocio_id: { type: DataTypes.INTEGER },
    longId: { type: DataTypes.STRING },
    shortId: { type: DataTypes.STRING },
    fecha: { type: DataTypes.DATEONLY },
    fechaHora: { type: DataTypes.STRING },
    fechaFormato: { type: DataTypes.STRING },
    horario: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "turnos" }
);
