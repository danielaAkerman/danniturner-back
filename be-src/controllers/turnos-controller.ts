import { User, Horarios, Turnos } from "../models";
import { v4 as uuidv4 } from "uuid";

function fechas(inicio: string, fin: string, dia: number) {
  // PRE: Recibe un lapso de tiempo definido por dos fechas, y un día de la semana
  // POST: Devuelve las fechas de ese lapso que coincidan con ese día de la semana

  const dia_epoch = 86400000;
  const tres_hs_epoch = dia_epoch / 8;
  const fecha_inicial = new Date(inicio).getTime() + tres_hs_epoch; // en epoch
  const fecha_final = new Date(fin).getTime() + tres_hs_epoch; // en epoch
  const dia_laborable = dia;
  const fechas: Object[] = [];
  var fecha_actual = fecha_inicial;

  while (fecha_actual <= fecha_final) {
    if (new Date(fecha_actual).getDay() == dia_laborable) {
      const fecha_actual_date = new Date(fecha_actual);
      const fecha_yyyymmdd: string =
        fecha_actual_date.getFullYear() +
        ("0" + (fecha_actual_date.getMonth() + 1)).slice(0, 2) +
        fecha_actual_date.getDate();

      fechas.push(fecha_yyyymmdd);
    }
    fecha_actual = fecha_actual + dia_epoch;
  }
  console.log(fechas);
  return fechas;
}

function horarioAMinutos(hora: string) {
  // console.log(hora, "es la hora de HORARIO A MINUTOS")
  const minutos = parseInt(hora.slice(3));
  const horas = parseInt(hora.slice(0, 2));
  const horaEnMinutos = horas * 60 + minutos;
  // console.log(horaEnMinutos);
  return horaEnMinutos;
}

function turnosFraccionamiento(
  duracion_turno: number,
  inicio_disponibilidad: number,
  fin_disponibilidad: number
) {
  const lapso_disponibilidad = fin_disponibilidad - inicio_disponibilidad;
  if (lapso_disponibilidad > duracion_turno) {
    const cantidad_turnos = Math.trunc(lapso_disponibilidad / duracion_turno);
    const horarios_turnos: string[] = [];
    var iteracion = 0;
    var horario_turno_actual: number = inicio_disponibilidad;

    horarios_turnos.push(
      Math.trunc(inicio_disponibilidad / 60) +
        ":" +
        ("0" + (horario_turno_actual % 60)).slice(-2)
    );

    while (iteracion < cantidad_turnos - 1) {
      horario_turno_actual = horario_turno_actual + duracion_turno;
      horarios_turnos.push(
        Math.trunc(horario_turno_actual / 60) +
          ":" +
          ("0" + (horario_turno_actual % 60)).slice(-2)
      );
      iteracion++;
    }

    console.log("Horarios de turnos: ", horarios_turnos);

    return horarios_turnos;
  }
}

export async function generarTurnos(datos) {
  const { desde, hasta } = datos;
  const { user_id, negocio_id, especialidad_id, prestador_id, horarios_id } =
    datos;

  const horariosDB = await Horarios.findByPk(horarios_id);
  const horarios = horariosDB.dataValues;
  const duracionTurno = horarios.duracion; // parseInt(horarios.dataValues.duracion);

  const diasIn = [
    "in-dom",
    "in-lunes",
    "in-martes",
    "in-mierc",
    "in-juev",
    "in-vier",
    "in-sab",
  ];

  const diasOut = [
    "out-dom",
    "out-lunes",
    "out-martes",
    "out-mierc",
    "out-juev",
    "out-vier",
    "out-sab",
  ];

  var i = 0;
  while (i < 7) {
    if (horarios[diasIn[i]]) {
      const horariosTurnosDia = turnosFraccionamiento(
        duracionTurno,
        horarioAMinutos(horarios[diasIn[i]]),
        horarioAMinutos(horarios[diasOut[i]])
      );
      const fechasDias_i = fechas(desde, hasta, i);

      const turnosCompletos: Object[] = [];
      for (const f of fechasDias_i) {

        for (const h of horariosTurnosDia) {
          const id = uuidv4().toUpperCase();
          const datosTurno = {
            longId: id,
            shortId: id.slice(0, 7),
            prestador_id,
            cliente_id:"",
            fecha: f,
            fechaHora:
              f.toString() +
              h.toString().slice(0, 2) +
              h.toString().slice(3, 5),
            fechaFormato:
              f.toString().slice(6, 8) +
              " " +
              f.toString().slice(4, 6) +
              " " +
              f.toString().slice(0, 4),
            horario: h,
            estado: "Disponible",
            paciente: null,
          };


        turnosCompletos.push(datosTurno);
      }
    }
  }
}}

// export async function signUp(datosUser) {
//   const { password, email, nivel, negocio, apellido, nombre, dni, estado } =
//     datosUser;
//   const user = await User.create({
//     email,
//     nivel,
//     negocio,
//     apellido,
//     nombre,
//     dni,
//     estado_user_id: estado,
//   });

//   const auth = await Auth.create({
//     email,
//     password,
//     user_id: user.dataValues.id,
//   });
//   return auth;
// }

// export async function updateUser(userId, userData, passHash) {
//   const updatedUser = await User.update(userData, { where: { id: userId } });
//   if (userData.password) {
//     userData.password = passHash;
//     await Auth.update(userData, { where: { id: userId } });
//   }
//   return updatedUser;
// }
