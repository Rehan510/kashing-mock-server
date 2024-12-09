import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'
import _ from "lodash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const writeFile = async (fileName, data) => {
  const FilePath = join(__dirname, '../mockData' + fileName);
  await fs.writeFile(FilePath, JSON.stringify(data, null, 2), 'utf8');
}
export const readFile = async (fileName) => {
  const FilePath = join(__dirname, '../mockData' + fileName);
  const data = await fs.readFile(FilePath, 'utf8');
  return JSON.parse(data);
}


export const response = (res, code = 1, description = "success", result = null) => {
  const resp = { statusCode: code, statusDescription: description, result: result }
  res.status(200).json(resp);
};

