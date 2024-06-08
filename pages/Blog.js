import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Style from "../styles/rashidStyles.module.css";
import * as fs from 'fs'; //this is to import file reader fs

const inter = Inter({ subsets: ["latin"] });
const Blog = (props) => {
  
  console.log('this is props=',props.allblogs);
  const [blogs, setBlogs] = useState([]);
  useEffect(()=>{
    setBlogs(props.allblogs);
    console.log('this is blog =',blogs)
  },[setBlogs])


  return (
    <main
      className={`flex min-h-screen flex-col items-center  ${inter.className}`} /*justify-between p-24 removed*/
    >
      <Head><title>CODERS BLOG</title></Head>
      <div className={Style.container}>
        {blogs ? (
          blogs.map((blog, index) => (
            <div key={index} className={Style.verticalgap}>
              <Link href={`/slugpost/${blog.title}`}>
                <div className={Style.h2}>{blog.title}</div>
                <div className={Style.para}>{blog.description.slice(0, 150)}</div>
                <div className={Style.h3}>Author: {blog.author}</div></Link>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

    </main>
  );
}

export async function getStaticProps(context) {
  let data = await fs.promises.readdir('blogpost') 
  let myfile;
  let allblogs=[];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myfile= await fs.promises.readFile(('blogpost/'+ item), 'utf-8') 
    allblogs.push(JSON.parse(myfile))
  }
  console.log('these are allblogs =',allblogs)
  return { props:  {allblogs}  }
}

export default Blog







  