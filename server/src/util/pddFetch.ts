import crypto from "crypto";
type Params = {
  type: string;
  [key: string]: string|number;
};

export const pddFetch = async (params: Params) => {
  Object.assign(params, {
    client_id: process.env.CLIENT_ID,
    timestamp: Math.floor(Date.now() / 1000),
  });

  const sign = createSign(params);
  const result = await fetch("http://gw-api.pinduoduo.com/api/router", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      ...params,
      sign,
    }),
  }).catch(err=>{
    console.log(err)
  });
if(!result) return {error:"result is null"}
  return result.json();
};

const createSign = (params: Params) => {
  const md5 = crypto.createHash("md5");
  const str = `${process.env.CLIENT_SECRET}${Object.keys(params)
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join("")}${process.env.CLIENT_SECRET}`;

  console.log(str);
  return md5.update(str).digest("hex").toUpperCase();
};
