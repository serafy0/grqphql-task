import db from "../db/db.js";
const Name = db("names");

export async function addName(newName) {
  try {
    return await Name.insert(newName).returning("*");
  } catch (err) {
    console.log(err);
  }
}
export async function getNames(lastId, limit) {
  try {
    if (!limit) {
      limit = 10;
    }

    if (!lastId) {
      return await db
        .select("name", "id")
        .from("names")
        .limit(limit)
        .orderBy("id", "desc");
    }

    return await db
      .select("name", "id")
      .from("names")
      .limit(limit)
      .where("id", "<", lastId)
      .orderBy("id", "desc");
  } catch (err) {
    console.log(err);
  }
}
