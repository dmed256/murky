const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('build'))

app.get('*', (req, res) => {
  express.static(path.join(__dirname, 'build/index.html'));
});

app.listen(port, () => {
  console.log(`Hosting app at: http://localhost:${port}`)
});
