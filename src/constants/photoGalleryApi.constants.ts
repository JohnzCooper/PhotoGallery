const {
    SERVER_PORT,
    APP_TOKEN,
    APP_VERSION,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env; 

export const PORT = SERVER_PORT || 3010;
export const APPLICATION_TOKEN = APP_TOKEN || "YvlVLbj7mBm2WIHyQGO53A==";
export const APPLICATION_VERSION = APP_VERSION || "0.3.0";
export const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
//export const MONGO_URL = "mongodb://localhost:27017/admin";