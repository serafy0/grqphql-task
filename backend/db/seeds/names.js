/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("names").del();
  await knex("names").insert([
    { name: "Patrick" },
    { name: "Brandon" },
    { name: "Terry" },
  ]);
}
