const { Pool } = require('pg');
const config = require('./index');

const pool = new Pool({
  connectionString: config.database.url,
  ssl: config.database.ssl,
});

// Test database connection
pool.on('connect', () => {
  console.log('Database connected successfully');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};