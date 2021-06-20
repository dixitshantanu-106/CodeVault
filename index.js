const config = require('config');

const app = require('./app');

const PORT = config.get('port') || 3000

app.listen(PORT);
