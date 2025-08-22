import { app, initTables } from "./app";

const port = 3000;

initTables([2, 5, 4, 3, 2, 5, 4, 2]);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
