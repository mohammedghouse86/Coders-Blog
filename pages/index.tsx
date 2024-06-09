import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Style from "../styles/rashidStyles.module.css";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import * as fs from 'fs'; //this is to import file reader fs

const inter = Inter({ subsets: ["latin"] });

type Blog = {
  title: string;
  description: string;
  author: string;
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: React.FC<Props> = (props) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setBlogs(props.allblogs);
  }, [props.allblogs]);

  return (
    <main className={`flex min-h-screen flex-col items-center ${inter.className}`}>
      <Head><title>CODERS BLOG</title></Head>
      <div className={Style.container}>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div key={index} className={Style.verticalgap}>
              <Link href={`/slugpost/${blog.title}`}>
                <div className={Style.h2}>{blog.title}</div>
                <div className={Style.para}>{blog.description.slice(0, 150)}</div>
                <div className={Style.h3}>Author: {blog.author}</div>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export async function getStaticProps() {
  let data1 = await fs.promises.readdir('blogpost');
  let allblogs = [];

  for (let index = 0; index < data1.length; index++) {
    const item = data1[index];
    const myfile = await fs.promises.readFile(`blogpost/${item}`, 'utf-8');
    allblogs.push(JSON.parse(myfile));
  }

  return { props: { allblogs } };
}


export default Home;
