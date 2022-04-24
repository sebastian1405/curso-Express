const express = require("express");
const cookieParser = require("cookie-parser");
const { path } = require("express/lib/application");
const res = require("express/lib/response");
const { routeHelper, sleep, addUserToDB } = require("./routeHelper");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser);

app.post("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const { test } = req.query;
  const { name, age } = req.body;
  const cookies = req.cookies;
  const headers = req.headers;
  const ip = req.ip;
  res.json({
    id: userId,
    name,
    age,
    test,
    contentType,
    ip,
    cookies,
    headers,
  });
});

app.get("/users/error", (req, res) => {
  res.status(401).json({
    error: "hubo algun error",
  });
});
app.get("/users/error-code", (req, res) => {
  res.sendStatus(403);
});
app.get("/users/send", (req, res) => {
  res.send({
    name: "Leo",
  });
});
app.get("/users/send-buffer", (req, res) => {
  res.send(new Buffer("esto es un buffer"));
});
app.get("/users/send-header", (req, res) => {
  res.set({
    "Content-Type": "application/json",
    "x-mi-cache": "cacheId",
  });
  res.append("x-mi-cache-v2", "cacheIdV2").json({
    status: "ok",
  });
});

app.get("/users/send-cookie", (req, res) => {
  res
    .cookie("mi-cookie", "12345", {
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({
      status: "ok",
    });
});

app.get("/users/clear-cookie", (req, res) => {
  res.clearCookie("mi-cookie").json({
    status: "ok",
  });
});

app.get("/users/redirect-location", (req, res) => {
  res.redirect("https://www.google.com.ar/?hl=es");
});

app.get("/users/download", (req, res) => {
  res.download(path.join(__dirname, "file.txt"), "hola.txt");
});
//manejo de errores
app.get(
  "/test",
  routeHelper(async (req, res) => {
    // await sleep(500);

    // await test(); //funcion que no existe para el error
    res.json({
      status: "ok",
    });
  })
);

app.get(
  "/test2",
  routeHelper(async (req, res) => {
    //codigo unico
  })
);
app.listen(5000, () => console.log("API ready port:5000..."));
