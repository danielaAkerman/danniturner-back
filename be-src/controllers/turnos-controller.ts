import { User,  Horarios, Turnos } from "../models";

export async function generarTurnos(datos) {
  const { desde, hasta } = datos;
  const { id_user, id_negocio, id_especialidad, id_prestador, id_horarios } =
    datos;

  const horarios = await Horarios.findByPk(id_horarios);
  const duracion = horarios.dataValues.duracion;
  const {
    in_dom,
    in_lun,
    in_mar,
    in_mie,
    in_jue,
    in_vie,
    in_sab,
    out_dom,
    out_lun,
    out_mar,
    out_mie,
    out_jue,
    out_vie,
    out_sab,
  } = horarios.dataValues;

  
}

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
