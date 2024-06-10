import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Style from "../styles/rashidStyles.module.css";
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroll-component';

const inter = Inter({ subsets: ["latin"] });

//const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'), { ssr: false });
const MyAnimation = dynamic(() => import('./Animation'), { ssr: false }); // Ensure the path is correct

const Hood = () => {
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(10);
  const [totalBlogs, setTotalBlogs] = useState(0);

  useEffect(() => {
    const fetchTotalBlogs = async () => {
      const response = await fetch(`http://localhost:3000/api/getblogtitle`);
      const data = await response.json();
      setTotalBlogs(data.length); // Assuming data is an array of blog titles
    }
    fetchTotalBlogs();
    //console.log(totalBlogs!==blogs.length)
  }, [])

  useEffect(() => {
    console.log("Initial load");
    fetchData();
  }, []);

  const fetchData = async () => {
    //console.log("This is fetch data");
    const response = await fetch(`http://localhost:3000/api/getblogcontent_InfyScroll/?count=${count}`);
    const data = await response.json();
      setBlogs(data);
      setCount(count+10); // Increment count for the next fetch
    
  };

  return (
    <main className={`flex min-h-screen flex-col items-center ${inter.className}`}>
      <Head><title>CODERS BLOG</title></Head>

      <InfiniteScroll
        dataLength={blogs.length}
        next={fetchData}
        hasMore={totalBlogs!==blogs.length }
        loader={<MyAnimation />} // Use MyAnimation component as loader
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className={Style.container}>
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className={Style.verticalgap}>
                <Link href={`/slugpost/${blog.title}`}>
                  <div className={Style.h2}>{blog.title}</div>
                </Link>
                <div className={Style.para}>{blog.description.slice(0, 150)}</div>
                <div className={Style.h3}>Author: {blog.author}</div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </InfiniteScroll>
    </main>
  );
};

export default Hood;
