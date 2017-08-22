module.exports = {
  'development': {
    username: null,
    password: null,
    database: 'dbtodo',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  'test': {
    username: null,
    password: null,
    database: 'dbtodo_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  'production': {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'dbtodo',
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
