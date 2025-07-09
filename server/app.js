import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import session from "express-session";
import flash from "connect-flash";

import authRouter from "./routes/auth.route.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "..", "client", "views"));
app.use(
  express.static(path.join(import.meta.dirname, "..", "client", "public"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({ secret: "my-secret", resave: true, saveUninitialized: false })
);
app.use(flash());
app.use(cookieParser());

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.use("/", (req, res) => {
  res.status(404).send("Page Not Found");
});

export default app;
