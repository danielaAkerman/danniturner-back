import * as express from "express";
import * as path from "path";
import * as crypto from "crypto";
import * as process from "process";
import * as cors from "cors";
const sgMail = require("@sendgrid/mail");
import * as jwt from "jsonwebtoken";
import { User, Auth, EstadoUser, Cliente } from "./models";
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
  const { apellido } = req.body || "";
  const { nombre } = req.body || "";
  const { dni } = req.body || "";
  const clienteEncontrado = await Cliente.findAll({
    where: req.body,
  });
  res.json(clienteEncontrado);
});

app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
  res.sendFile(staticDirPath + "/index.html");
});

app.listen(port, () => {
  console.log("Corriendo en puerto " + port);
});
