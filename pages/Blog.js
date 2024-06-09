import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Style from "../styles/rashidStyles.module.css";
import * as fs from 'fs'; //this is to import file reader fs

const inter = Inter({ subsets: ["latin"] });

const Blog = (props) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(props.allblogs);
    console.log('this is blog =', blogs);
  }, [props.allblogs]); // Add props.allblogs to dependency array

  return (
    <main className={`flex min-h-screen flex-col items-center  ${inter.className}`}>
      <Head><title>CODERS BLOG</title></Head>
      <div className={Style.container}>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div key={index} className={Style.verticalgap}>
              <Link href={`/slugpost/${blog.title}`}>
                <div className={Style.h2}>{blog.title}</div>
                <div className={Style.para}>{blog.description.slice(0, 150)}</div>
                <div className={Style.h3}>Author: {blog.author}</div>
                <div contentEditable='true' dangerouslySetInnerHTML={{ __html: blog.statement }}></div>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  let data = await fs.promises.readdir('blogpost');
  let allblogs = [];

  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    const myfile = await fs.promises.readFile(`blogpost/${item}`, 'utf-8');
    allblogs.push(JSON.parse(myfile));
  }

  return { props: { allblogs } };
}

export default Blog;
