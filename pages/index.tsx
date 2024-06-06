import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect,useState } from "react";
import Link from "next/link";

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
            
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div key={index}>
            <Link href={`/slugpost/${blog.title}`}>
            <p>{blog.description.slice(0,150)}</p>
            <p>Author: {blog.author}</p></Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      
    </main>
  );
}
