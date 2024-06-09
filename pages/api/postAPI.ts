import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs'; //this is to import file reader fs

type ResponseData = {
  message: Record<string, unknown>
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    //console.log(req.body)
    let data = await fs.promises.readdir('contactMsg') 
    fs.promises.writeFile(`contactMsg/${data.length+1}.json`,JSON.stringify(req.body))
    res.json({"success":"true"})
  } else {
    res.status(401).json({"success":"false"})
  }
}