require('dotenv').config();

const app = require('./app');

const port = process.env['PORT'] || 8000;

app.listen(port, () => {
  console.log(`Server running and listen on port ${port}...`);
})