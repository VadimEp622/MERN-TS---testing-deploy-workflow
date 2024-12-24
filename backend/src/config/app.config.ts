function config() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
  };
}

export const appConfig = config();
