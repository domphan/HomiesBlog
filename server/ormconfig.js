module.exports = {
  "type": "postgres",
  "host": "postgres",
  "port": 5432,
  "username": "DominicPhan",
  "password": "poopoo",
  "database": process.env.PG_NAME,
  "synchronize": true,
  "logging": false,
  "entities": [
    "models/index.ts"
  ],
  "migrations": [
    "migration/*.ts"
  ],
  "subscribers": [
    "subscriber/*.ts"
  ],
  "cli": {
    "entitiesDir": "models",
    "migrationsDir": "migration",
    "subscribersDir": "subscriber"
  }
}