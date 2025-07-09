import env from "./config/env.js";
import app from "./app.js";

const port = parseInt(env.port);

app.listen(port, () => {
  console.log(`Server is running at Port: ${port}`);
});
