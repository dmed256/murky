const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('.'))

app.get('*', (req, res) => {
  res.status(400).send("File doesn't exist");
});

app.listen(port, () => {
  console.log(`Hosting app at: http://localhost:${port}`)
});
