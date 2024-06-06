import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect,useState } from "react";
import Link from "next/link";
import Style from "../styles/rashidStyles.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [blogs, setBlogs] = useState<blog[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/getblogcontent')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  type blog = {
    title: string;
    description: string;
    author: string;
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center  ${inter.className}`} /*justify-between p-24 removed*/
>
      <Head><title>CODERS BLOG</title></Head>
      <div className={Style.container}>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div key={index} className={Style.verticalgap}>
            <Link href={`/slugpost/${blog.title}`}>
            <div className={Style.h2}>{blog.title}</div>
            <div className={Style.para}>{blog.description.slice(0,150)}</div>
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
