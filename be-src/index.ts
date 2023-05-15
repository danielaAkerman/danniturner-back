import * as express from "express";
import * as path from "path";
import * as crypto from "crypto";
import * as process from "process";
import * as cors from "cors";
const sgMail = require("@sendgrid/mail");
import * as jwt from "jsonwebtoken";
import {
  User,
  Auth,
  EstadoUser,
  Cliente,
  Negocio,
  Sucursal,
  Especialidad,
  EstadoEspecialidad,
  Prestador,
  Horarios,
  Turnos,
} from "./models";
import { signUp } from "./controllers/users-controller";
import { getAuth } from "./controllers/auth-controller";
// import { getAuth, signIn } from "./controllers/auth-controller";
import { crearEstado } from "./controllers/estados-controller";
import { registrarNuevoCliente } from "./controllers/cliente-controller";
// import { index } from "./lib/algolia";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

const SECRET = process.env.SECRET;
const staticDirPath = path.resolve(__dirname, "../dist");

function getSHA(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// test
app.get("/test", async (req, res) => {
  const users = User.findAll();
  res.json(users);
});

// app.post("/test", async (req, res) => {
//   const test = Test.create(req.body);
//   res.json(true);
// });

// app.get("/test/:id", async (req, res) => {
//   const test = await Test.findByPk(req.params.id);
//   res.json(test);
// });

// Crear estados User
app.post("/estado", async (req, res) => {
  const estado = req.body.nombre;
  const respuesta = await crearEstado(estado);
  res.json(respuesta);
});

// Ver estados User
app.get("/estado", async (req, res) => {
  const respuesta = await EstadoUser.findAll();
  res.json(respuesta);
});

// signUp
app.post("/auth", async (req, res) => {
  req.body.password = getSHA(req.body.password); //Encripta pass
  const auth = await signUp(req.body);
  res.json(auth);
});

// Ver Users
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// logIn
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const passHash = getSHA(password);
  const auth = await getAuth(email, passHash);

  res.json(auth); //Devuelve token y toda la info del user
});

// signIn
// app.post("/auth/token", async (req, res) => {
//   const { email, password } = req.body;
//   const passHash = getSHA(password);
//   const auth = await signIn(email, passHash);
//   res.json(auth);
// });

// Registrar nuevo Cliete
app.post("/nuevo-cliente", async (req, res) => {
  const nuevoCliente = await registrarNuevoCliente(req.body);
  res.json(nuevoCliente);
});

app.get("/clientes", async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

app.post("/search-cliente", async (req, res) => {
  const clientesEncontrado = await Cliente.findAll({
    where: req.body,
  });
  res.json(clientesEncontrado);
  // Con esta info ya tiene todos los datos de cada cliente q coincide
});

app.get("/cliente/:id", async (req, res) => {
  const clienteId = req.params.id;
  const clienteEncontrado = await Cliente.findByPk(clienteId);
  res.json(clienteEncontrado);
});

app.post("/edit-cliente/:id", async (req, res) => {
  const clienteId = req.params.id;
  const clienteEditado = await Cliente.update(req.body, {
    where: { id: clienteId },
  });
  res.json(clienteEditado);
});

app.post("/negocio", async (req, res) => {
  const { nombre, sucursal_id } = req.body;
  const nuevoNegocio = await Negocio.create(req.body);
  res.json(nuevoNegocio);
});

app.get("/negocios", async (req, res) => {
  const negocios = await Negocio.findAll();
  res.json(negocios);
});

app.post("/sucursal", async (req, res) => {
  const nuevaSucursal = await Sucursal.create(req.body);
  res.json(nuevaSucursal);
});

app.get("/sucursales", async (req, res) => {
  const sucursales = await Sucursal.findAll();
  res.json(sucursales);
});

app.post("/especialidad", async (req, res) => {
  const nuevaEspecialidad = await Especialidad.create(req.body);
  res.json(nuevaEspecialidad);
});

app.get("/especialidades", async (req, res) => {
  const especialidades = await Especialidad.findAll();
  res.json(especialidades);
});

app.post("/estado-especialidad", async (req, res) => {
  const nuevoEstadoEsp = await EstadoEspecialidad.create(req.body);
  res.json(nuevoEstadoEsp);
});

app.get("/estados-especialidad", async (req, res) => {
  const estadosEsp = await EstadoEspecialidad.findAll();
  res.json(estadosEsp);
});

app.post("/nuevo-prestador", async (req, res) => {
  const nuevoPrestador = await Prestador.create(req.body);
  res.json(nuevoPrestador);
});

app.get("/prestadores", async (req, res) => {
  const prestadores = await Prestador.findAll();
  res.json(prestadores);
});

app.post("/horario", async (req, res) => {
  const nuevoHorario = await Horarios.create(req.body);
  res.json(nuevoHorario);
});

app.get("/horarios", async (req, res) => {
  const horarios = await Horarios.findAll();
  res.json(horarios);
});

app.post("/turnos", async (req, res) => {
  // recibe desde, hasta, user_id, negocio_id, especialidad_id, prestador_id
  const nuevoTurno = await Turnos.create(req.body);
  res.json(nuevoTurno);
});

app.get("/turnos", async (req, res) => {
  const turnos = await Turnos.findAll();
  res.json(turnos);
});

app.patch("/turnos", async (req, res) => {
  const asignarAPaciente = await Turnos.update(req.body, { where: {} });
  res.json(asignarAPaciente);
});

app.get("/turnos/:dni-cliente", async (req, res) => {
  const dniCliente = req.params["dni-cliente"];
  const turnosCliente = await Turnos.findAll({ where: { cliente_id: dniCliente } });
  res.json(turnosCliente);
});

app.get("/turnos/:dni-prestador", async (req, res) => {
  const dniPrestador = req.params["dni-prestador"];
  const turnosprestador = await Turnos.findAll({ where: { prestador_id: dniPrestador } });
  res.json(turnosprestador);
});

app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
  res.sendFile(staticDirPath + "/index.html");
});

app.listen(port, () => {
  console.log("Corriendo en puerto " + port);
});
