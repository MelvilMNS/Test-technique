const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

type Table = {
  id: number;
  capacity: number;
  occupied: boolean;
};

let tables: Table[] = [];

function initTables(capacities: number[]) {
  for (let tableIndex = 0; tableIndex < capacities.length; tableIndex++) {
    const capacity = capacities[tableIndex];
    tables.push({ id: tableIndex, capacity: capacity, occupied: false });
  }
}

app.get("/tables", (req, res) => {
  res.json(tables);
});

app.post("/reservation", (req, res) => {
  const { size } = req.body;

  const availableTables = tables.filter(table => !table.occupied && table.capacity >= size);

  if (availableTables.length === 0) {
    return res.status(400).json({ message: "Pas de place disponible" });
  }

  availableTables.sort((table1, table2) => table1.capacity - table2.capacity);
  const chosenTable = availableTables[0];

  chosenTable.occupied = true;

  res.json({ table: chosenTable });
});

app.post("/liberation", (req, res) => {
  const { id } = req.body;
  const table = tables.find(table => table.id === id);
  if (table) table.occupied = false;
  res.json({ success: true });
});

app.listen(3000, () => {
  initTables([2, 5, 4]);
  console.log("Serveur démarré sur http://localhost:3000");
});
