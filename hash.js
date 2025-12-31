const bcrypt = require("bcryptjs");

const hash = bcrypt.hashSync(
  "b0707730923978d865656ba04fda731db05cdbcda09d19fa3120183da30351f8",
  12
);

console.log(hash);
