const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const next = require('next');

// const PORT = 3001; /* Web is running to show client */
const PORT = 3002;
const dev = process.env.ENV_MODE !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cors({ origin: '*' }));
  server.use(express.static(path.join(__dirname, 'public')));

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`MWW is running on port ${PORT}`);
  });
});
