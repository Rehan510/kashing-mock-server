import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import chalk from "chalk";
import dotenv from "dotenv";
import {
  PORT, NODE_ENV,
} from "./config/config.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const myLogger = function (req, res, next) {
  const { headers, method, url, body, query, params, device } = req;
  console.log(
    "===================================== END========================================",
  );
  try {
  } catch (error) {
    console.log(error);
  }
  next();
};

app.use(myLogger);
app.use(`/api`, routes);
const setExpress = () => {
  const appInfo = `
    ******************************************************
    *               Kashings Mock Server                 *
    *                                                    *
    *                                                    *
    *                   KASHINGS                         *
    *                                                    *
    *                                                    *
    *                                                    *
    *                                                    *
    * ****************************************************
    `;
  app.listen(PORT, (error) => {
    if (!error) {
      console.log(chalk.greenBright(appInfo));
      console.log(`
            Kashings Mock Server is Successfully Running, and App is listening on port  ${chalk.greenBright(
        PORT,
      )}...
          
          `);
      console.log(`
         APP ENVIRMENT IS  ${chalk.greenBright(NODE_ENV)}...
        
        `);
    } else {
      console.log("Error occurred, server can't start", error);
    }
  });
};

const setupServer = (isClusterRequired) => {
  // If it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isMaster) {
    // setupWorkerProcesses();
  } else {
    // Setup server configurations and share port address for incoming requests
    setExpress();
  }
};

if (process.env.NODE_ENV === "production") {
  // true for master process
  setupServer(false);
} else {
  setupServer(false);
}
