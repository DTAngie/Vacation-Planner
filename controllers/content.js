
async function functionName(req, res) {
  const newContent = await db.query(
    "INSERT INTO content (description) VALUES ($1) RETURNING *",
    [description]
  );
  //do something with new content. may also need to import db
}

module.exports = {
  functionName
}