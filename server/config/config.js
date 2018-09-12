const env = process.env.NODE_ENV;

const development = {
  server: {
    port: 8000
  },
  db: {
    login: "AmneZ",
    password: "coba4atuna",
    host: "localhost",
    port: 27017,
    name: "user"
  }
};

const production = {
  server: {
    port: 8000
  },
  db: {
    host: "localhost",
    port: 27017,
    name: "prod"
  }
};

const config = {
  development,
  production
};

module.exports = config[env];
