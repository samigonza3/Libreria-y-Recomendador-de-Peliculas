
const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: '172.18.0.3',
  database: 'postgres',
  password: 'admin',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});

pool.on('connect', () => {
  console.log('Conexión exitosa a la base de datos');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

//Este es un comentario
