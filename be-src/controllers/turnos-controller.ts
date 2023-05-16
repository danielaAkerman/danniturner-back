import { User, Horarios, Turnos } from "../models";
import { v4 as uuidv4 } from "uuid";

function fechas(inicio: string, fin: string, dia: number) {
  // PRE: Recibe un lapso de tiempo definido por dos fechas, y un día de la semana
  // POST: Devuelve las fechas de ese lapso que coincidan con ese día de la semana

  const dia_epoch = 86400000;
  const tres_hs_epoch = dia_epoch / 8; // Por nuestra zona horaria (GMT-3)
  const fecha_inicial = new Date(inicio).getTime() + tres_hs_epoch; // en epoch
  const fecha_final = new Date(fin).getTime() + tres_hs_epoch; // en epoch
  const dia_laborable = dia; // del 0 al 6, de domingo a sábado
  const fechas: string[] = [];
  var fecha_actual = fecha_inicial;

  while (fecha_actual <= fecha_final) {
    // Recorre todos los días del lapso.
    // Día por día, se fija si ese día es laborable para el prestador
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
  // PRE: Recibe la duración de cada turno, la hora de inicio de actividad de un día, y la hora de fin. Todo en minutos
  // POST: Devuelve un string[] de turnos en formato 23:59

  const lapso_disponibilidad = fin_disponibilidad - inicio_disponibilidad;
  if (lapso_disponibilidad >= duracion_turno) {
    const cantidad_turnos = Math.trunc(lapso_disponibilidad / duracion_turno);
    const horarios_turnos: string[] = [];
    var iteracion = 0;
    var horario_turno_actual: number = inicio_disponibilidad;

    // Agrega el primer turno y luego los siguientes, sumandoles la duracion del turno
    while (iteracion < cantidad_turnos) {
      horarios_turnos.push(
        Math.trunc(horario_turno_actual / 60) +
          ":" +
          ("0" + (horario_turno_actual % 60)).slice(-2)
      );
      horario_turno_actual = horario_turno_actual + duracion_turno;
      iteracion++;
    }

    return horarios_turnos;
  }
}

export async function generarTurnos(datos) {
  const { desde, hasta } = datos; // Fechas en string yyyy-mm-dd
  const { user_id, negocio_id, especialidad_id, prestador_id } = datos;

  const turnosCompletos: any[] = [];

  // Obtengo la disponibilidad horaria de ese profesional
  const horariosDB = await Horarios.findOne({
    where: { prestadorId: prestador_id },
  });
  const horarios = horariosDB.dataValues;
  const duracionTurno = horarios.duracion; // parseInt(horarios.dataValues.duracion);

  const diasIn = [
    "in_dom",
    "in_lun",
    "in_mar",
    "in_mie",
    "in_jue",
    "in_vie",
    "in_sab",
  ];

  const diasOut = [
    "out_dom",
    "out_lun",
    "out_mar",
    "out_mie",
    "out_jue",
    "out_vie",
    "out_sab",
  ];

  var i = 0;
  while (i < 7) {
    // Si el prestador trabaja ese día
    if (horarios[diasIn[i]]) {
      const horariosTurnosDia: string[] = turnosFraccionamiento(
        duracionTurno,
        horarioAMinutos(horarios[diasIn[i]]),
        horarioAMinutos(horarios[diasOut[i]])
      );
      const fechasDias_i: string[] = fechas(desde, hasta, i); // Todas las fechas que trabaja el prestador, comprendidas en el lapso

      for (const f of fechasDias_i) {
        for (const h of horariosTurnosDia) {
          const id = uuidv4().toUpperCase();
          const datosTurno = {
            longId: id,
            shortId: id.slice(0, 7),
            prestador_id,
            cliente_id: null, // Sin cliente por defecto
            fecha: f, //yyyymmdd para organizar cronológicamente
            //yyyymmdd + horas + minutos, para organizar cronológicamente
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
            estado_turno_id: 1, // Disponible por defecto
            user_id,
            negocio_id,
            especialidad_id,
          };

          turnosCompletos.push(datosTurno);
        }
      }
    }
  }
  await turnosCompletos.map((t) => Turnos.create(t));
}
