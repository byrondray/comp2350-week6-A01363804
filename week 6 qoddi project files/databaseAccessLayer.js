const database = include("/databaseConnection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function getAllUsers() {
  let sqlQuery = `
		SELECT web_user_id, first_name, last_name, email
		FROM web_user;
	`;

  try {
    const results = await database.query(sqlQuery);
    console.log(results[0]);
    return results[0];
  } catch (err) {
    console.log("Error selecting from todo table");
    console.log(err);
    return null;
  }
}

async function addUser(postData) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(postData.password + passwordPepper, salt);

    let sqlInsertUser = `INSERT INTO web_user (first_name, last_name, email, password_salt, password_hash)
		VALUES (:first_name, :last_name, :email, :salt, :hash);  
	  `;
    let params = {
      first_name: postData.first_name,
      last_name: postData.last_name,
      email: postData.email,
      salt: salt,
      hash: hash,
    };

    const results = await database.query(sqlInsertUser, params);
    return results.affectedRows === 1;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = { getAllUsers, addUser };
