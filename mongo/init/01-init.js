db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [{ role: "readWrite", db: process.env.MONGO_INITDB_DATABASE }]
});

db.users.insertMany([
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob",   email: "bob@example.com" }
]);
