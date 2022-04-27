const knexfile = {
  client: "pg",
  connection: {
    database: "graphql_db",
    user: "",
    password: "",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

export const { client, connection, migrations, seeds, useNullAsDefault } =
  knexfile;
