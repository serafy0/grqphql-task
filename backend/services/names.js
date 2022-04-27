import db from "../db/db.js";
const Name = db("names");

export async function addName(newName) {
  try {
    return await Name.insert(newName).returning("*");
  } catch (err) {
    console.log(err);
  }
}
export async function getNames() {
  try {
    return await db.select("name", "id").from("names");
  } catch (err) {
    console.log(err);
  }
}
