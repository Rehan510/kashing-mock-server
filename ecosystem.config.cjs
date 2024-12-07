// This port will be user for express server
const PORT = 5211;
const BASE_PRE_FIX = "kashingsmockserver";
const NAME = "Kashings Mock Server";
module.exports = {
  apps: [
    {
      script: "src/index.js",
      watch: true,
      env: {
        NODE_ENV: "default",
        PORT: PORT,
        name: "default",
      },
      env_dev: {
        name: `${NAME}-dev`,
        NODE_ENV: "development",
        PORT: process.env.PORT || PORT,
      },
      env_qa: {
        name: `${NAME}-Qa-1`,
        NODE_ENV: "qa-1",
        PORT: process.env.PORT || PORT,

      },
      env_uat: {
        name: `${NAME}-Uat-1`,
        NODE_ENV: "uat-1",
        PORT: process.env.PORT || PORT,
      },
      env_production: {
        name: `${NAME}-Prod`,
        NODE_ENV: "production",
        PORT: process.env.PORT || PORT,

      },
    },
  ],
};
