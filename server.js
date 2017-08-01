const path = require('path');
const express = require('express');

const env = process.env.NODE_ENV || 'production';
const port = process.env.PORT || 4200;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  // load the single view file ( will handle the page changes on the front-end)
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port: ${ port }`);
  }
});
