import userjson from '../../jsonData/user.json' assert { type: 'json' };
const data=[]
export const getUser = async (req, res) => {
  const {body}=req
  console.log(body)
  const resp = userjson.push(body)
  try {
    res.status(200).json(userjson);
    // successResponse(res, resp);
  } catch (error) {
    res.status(201).json(data);
  }
};
export const potUser = async (req, res) => {
  const {body}=req
  console.log("'ppppp")
  const resp = data.push(body)
  try {
    res.status(200).json(data);
    // successResponse(res, resp);
  } catch (error) {
    res.status(201).json(data);
  }
};





