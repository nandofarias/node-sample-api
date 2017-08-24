const db = {
  database: 'dbtodo',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  dialect: 'postgres'
}
module.exports = {
  development: Object.assign({}, db),
  production: Object.assign({}, db)
};
