// const IPFS = require('ipfs-http-client');
// const clientId = "9c3abb22f5a23a866b928644561a2a0c";
// const secretKey = "JCGYZ7U90u7FT2kpJAF6GY2SJD0CKL22f1TakLW2L6JcYoqtjscmN85g_xOHu08nuZLTrC5xysIzEAzQITvJmA";

// const ipfs = IPFS.create({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: `Basic ${Buffer.from(`${clientId}:${secretKey}`).toString('base64')}`,
//   },
// });

// export default ipfs;

// const Moralis = require('moralis').default;
// const ABI = require('./Pages/Home/profile.json')

// Moralis.start({
//   apiKey: "gwR6OG5P1SX7bq9zmEWx1j7FAdOrlK2U9yh7zmofkPLlD7wUzFici9UtZ6rhOY1O"
// }).then(async()=>{

//   const response = await Moralis.EvmApi.utils.runContractFunction({
//     address: "0x4Ba6a9a077acb4155bb9Ea6093788e118b78fCCE",
//     functionName: "getProfile",
//     abi: ABI,
//   })

//   console.log(response.raw);
// })

import {ThirdwebStorage} from "@thirdweb-dev/storage"
import fs from "fs"

const storage = new ThirdwebStorage();

(async()=>{
  const upload = await storage.upload(fs.readFileSync('./logo.png'));

  console.log("uploaded link: ", storage.resolveScheme(upload))
})();