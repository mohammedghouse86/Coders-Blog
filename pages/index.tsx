import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Style from "../styles/rashidStyles.module.css";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

const inter = Inter({ subsets: ["latin"] });



const Home = (props) => {
  
  //console.log('this is props=',props.data1);
  const [blogs, setBlogs] = useState<blog[]>([]);
  useEffect(()=>{
    setBlogs(props.data1)
  },[])
  

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

export async function getServerSideProps() {
  let response = await fetch('http://localhost:3000/api/getblogcontent')
  let data1 = await response.json()
  return { props:  {data1}  }
}

export default Home