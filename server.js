const express = require('express'),
      path = require('path'),
      http = require('http'),
      bodyParser = require('body-parser'),
      api = require('./server/routes/api'),
      app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => console.log(`API running on localhost:${port}`));