import knex from "knex";
import * as knexfile from "./knexfile.js";

//in prod you should probably use dependency injection

//replace this with env vars
const db = knex(knexfile);

export default db;
