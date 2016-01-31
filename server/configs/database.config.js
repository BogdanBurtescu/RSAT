var Collections =
{
    GEOGRAPHY_COLLECTION: "GEOGRAPHICAL_ENTITIES",
    USERS_COLLECTION: "users"
}


exports.DatabaseConfig =
{
    databaseName: 'RSAT',
    databaseUrl: "mongodb://localhost/RSAT",
    databaseCollections: [Collections.USERS_COLLECTION, Collections.GEOGRAPHY_COLLECTION]
}