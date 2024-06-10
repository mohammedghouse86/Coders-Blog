// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs'; //this is to import file reader fs


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  fs.readdir('blogpost',(err,data)=>{ //blogpost is the folder containing the data read directory
    const response = data.length;
    res.status(200).json(data); 

    //return (response);
  })
  
}
