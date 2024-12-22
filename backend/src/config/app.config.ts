function configDev() {
  return {
    DB_URL: process.env.DEV_DB_URL,
    DB_NAME: process.env.DEV_DB_NAME,
  };
}

function configProd() {
  return {
    DB_URL: process.env.PROD_DB_URL,
    DB_NAME: process.env.PROD_DB_NAME,
  };
}

function config() {
  const configByEnv =
    process.env.NODE_ENV === "production" ? configProd : configDev;
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    ...configByEnv(),
  };
}

export const appConfig = config();
