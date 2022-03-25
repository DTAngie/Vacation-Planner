const { Pool } = require('pg');

const postgres = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432
});

postgres.connect((err, client) => {
  if(err){
    return console.log(err)
  }
  console.log(`Connected to Postgres at ${client.host}:${client.port}`);
})

// module.exports = postgres;