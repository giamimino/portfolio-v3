require("dotenv").config();
const bcrypt = require("bcryptjs");

bcrypt.compare(
  "b0707730923978d865656ba04fda731db05cdbcda09d19fa3120183da30351f8",
  process.env.ADMIN_KEY_HASH
).then(console.log);
console.log(process.env.ADMIN_KEY_HASH)
