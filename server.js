/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (!err) {
    console.log(`server is listening on port ${port}`);
  }
});
