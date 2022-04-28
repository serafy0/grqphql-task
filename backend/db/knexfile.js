const knexfile = {
  client: "pg",
  connection: {
    url: process.env.DATABASE_CONNECTION,
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
