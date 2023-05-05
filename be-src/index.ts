import * as express from "express";
import * as path from "path";
import * as crypto from "crypto";
import * as process from "process";
import * as cors from "cors";
const sgMail = require("@sendgrid/mail");
import * as jwt from "jsonwebtoken";
import { User, Auth, Test, Estado } from "./models";
import { signUp } from "./controllers/users-controller";
import { signIn } from "./controllers/auth-controller";
import { crearEstado } from "./controllers/estados-controller";
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

// Crear estados
app.post("/estado", async (req, res) => {
  const estado = req.body.nombre;
  const respuesta = await crearEstado(estado);
  res.json(respuesta);
});

// Ver estados
app.get("/estado", async (req, res) => {
  const respuesta = await Estado.findAll();
  res.json(respuesta);
});

// logIn
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const passHash = getSHA(password);
  // const auth = await getAuth(email, passHash);

  const auth = await Auth.findOne({
    where: {
      email,
      password: passHash,
    },
  });
  // Si no hay registro de ese usuario y esa contraseña, devuelve null
  if (auth) {
    const id = auth.dataValues.user_id;
    const token = jwt.sign({ id }, SECRET);
    const user = await User.findByPk(id);
    return { token, user };
  } else {
    return { message: "not found" };
  }

  res.json(auth);
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

// signIn
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const passHash = getSHA(password);
  const auth = await signIn(email, passHash);
  res.json(auth);
});

// app.post("/update-user/:id", async (req, res) => {
//   const { id } = req.params;
//   const passHash = getSHA(req.body.password);
//   const updatedUser = await updateUser(id, req.body, passHash);
//   res.json(updatedUser);
// });

// // async function authMiddleware(req, res, next) {
// //   const token = req.headers.authorization.split(" ")[1];
// //   try {
// //     const data = jwt.verify(token, SECRET);
// //     req._user = data;
// //     next();
// //   } catch (e) {
// //     res.status(401).json({ error: true });
// //   }
// // }

// app.post("/new-pet", async (req, res) => {
//   const newPet = await updateNewPet(req.body);
//   res.json(newPet);
// });

// app.post("/new-report", async (req, res) => {
//   const reporte = await newReport(req.body);
//   // reporte= { message: `Reporte enviado a ${ownerEmail}` }
//   res.json({reporte});
// });

// app.post("/edit-pet/:id", async (req, res) => {
//   const { id } = req.params;
//   const editedPet = await editPet(id, req.body);
//   res.json(editedPet);
// });

// app.post("/delete-pet/:id", async (req, res) => {
//   const { id } = req.params;
//   const deletedPet = await deletePet(id, req.body);
//   res.json(deletedPet);
// });

// app.get("/pet/:id", async (req, res) => {
//   const { id } = req.params;
//   const pet = await getOnePet(id);
//   res.json(pet);
// });

// app.get("/my-pets/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const pets = await getMyPets(userId);
//   res.json(pets);
// });

// app.get("/pets-near-me", async (req, res) => {
//   const { lat, lng } = req.query;
//   const { hits } = await petsNearMe(lat, lng);
//   res.json(hits);
// });

app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
  res.sendFile(staticDirPath + "/index.html");
});

app.listen(port, () => {
  console.log("Corriendo en puerto " + port);
});
