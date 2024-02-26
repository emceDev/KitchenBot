import asyncHandler from "express-async-handler";

export const getManualSteerData = asyncHandler(async (req, res) => {
  console.log("getmanualsteerdata");
  return res.status(200).json("get");
});
export const setManualSteerData = asyncHandler(async (req, res) => {
  console.log("post", req.body);
  res.send(`'Hit success tw', ${req.url}`);
  //const firstEntry = new testModel({position:req.body.position,str:'asdfasdfasdfasdfsdfa'})
  //await firstEntry.save()
  //await Tank.updateOne({ size: 'large' }, { name: 'T-90' });

  console.log("Rekord:", x);
});
