import { PORT, NODE_ENV } from "../config/config.js";
import {
  javaEndPoint,
  javaResponse,
  errorResponse,
  successResponse,
} from "../utils/communicationHelper.js";
import axios from "axios";
export const testRoute = async (req, res) => {
  const { headers, body } = req;
  let option = {
    message: "THIS IS TEST ROUTE",
    error: false,
    info: { envirment: NODE_ENV, runningPort: PORT },
    success: true,
  };

  try {
    // const resp =  await axios.get("https://api.publicapis.org/entries", body, { headers })
    // console.log(resp.data)
    res.status(200).json(
      successResponse(option, {
        info: {
          envirment: NODE_ENV,
          runningPort: PORT,
          name: "communication_portal",
        },
      }),
    );
  } catch (error) {
    res.status(200).json(errorResponse(option, { name: "node" }));
  }
};
