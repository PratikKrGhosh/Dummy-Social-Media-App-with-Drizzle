import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({ secret: "my-secret", resave: true, saveUninitialized: false })
);
app.use(flash());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.use("/", (req, res) => {
  res.status(404).send("Page Not Found");
});

export default app;
