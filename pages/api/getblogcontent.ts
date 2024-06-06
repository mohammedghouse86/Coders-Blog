// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs'; //this is to import file reader fs


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let data = await fs.promises.readdir('blogpost') 
  let myfile;
  let allblogs=[];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myfile= await fs.promises.readFile(('blogpost/'+ item), 'utf-8') 
    allblogs.push(JSON.parse(myfile))
  }
  res.status(200).json(allblogs)
  }
