import _ from "lodash";
import chalk from "chalk";
// import { BASE_URL } from '../config/config.js'


export const response = (res, data) => {
  const resp = { statusCode: 1, statusDescription: "pkkk", result: data }
  res.status(200).json(resp);
};

export const endPointInfo = (data) => {
  console.log(chalk.redBright("============START============"));
  for (const property in data) {
    console.log(`**********${chalk.greenBright(property)}**********`);
    const url = property === "END_POINT" ? `${data[property]}` : data[property];
    console.log(url);
  }
  console.log(chalk.redBright("============END============"));
};

export const getHeaders = (headers) => {

  const header = headers;
  delete header['host']
  delete header['postman-token']
  console.log(header)
  return header;
};
