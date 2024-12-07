import _ from "lodash";
import { errorResponse } from "../utils/communicationHelper.js";
export const userAuth = (req, res, next) => {
  const { headers } = req;
  next();
  // const authToken = _.get(headers, "usercredentials", false);
  // if (!authToken) {
  //   res.status(401).json(errorResponse({
  //     "statusDescription": "user authentication failed. Please check your req header",
  //   }))
  // }

  // const channelId = _.get(headers, "channelid", false)
  //   ? _.get(headers, "channelid", false)
  //   : undefined;

  // req.body.headers = {
  //   userCredentials: authToken,
  //   channelId: channelId,
  // };
};
