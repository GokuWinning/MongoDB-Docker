// mongo-init.js
print("Started Adding the Users.");

db = db.getSiblingDB("admin");

// The username and password values will be passed from environment variables
var username = process.env.MONGO_INITDB_ROOT_USERNAME;  // Default to "admin" if not set
var password = process.env.MONGO_INITDB_ROOT_PASSWORD; // Default to "password" if not set

db.createUser({
  user: username,
  pwd: password,
  roles: [{ role: "readWrite", db: "admin" }],
});

print("End Adding the User Roles.");
