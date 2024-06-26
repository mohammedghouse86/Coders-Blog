import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Style from "../styles/rashidStyles.module.css";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import fs from 'fs/promises'; // Use promises version directly
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'), { ssr: false });
const MyAnimation = dynamic(() => import('./Animation'), { ssr: false }); // Ensure the path is correct

type Blog = {
  title: string;
  description: string;
  author: string;
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: React.FC<Props> = (props) => {
  const [blogs, setBlogs] = useState<Blog[]>(props.allblogs);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    let dummyArray = [];
    for (let index = 0 + dummyArray.length; index < props.allblogs.length && index < 10 + dummyArray.length; index++) {
      dummyArray.push(props.allblogs[index]);
    }
    setBlogs((prevBlogs) => [...prevBlogs, ...dummyArray]);
    setHasMore(blogs.length !== props.allblogs.length);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center ${inter.className}`}>
      <Head><title>CODERS BLOG</title></Head>
      
      <InfiniteScroll
        dataLength={blogs.length}
        next={fetchData}
        hasMore={hasMore}
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

export const getStaticProps: GetStaticProps = async () => {
  const data1 = await fs.readdir('blogpost');
  const allblogs = await Promise.all(data1.map(async (item) => {
    const myfile = await fs.readFile(`blogpost/${item}`, 'utf-8');
    return JSON.parse(myfile);
  }));

  return { props: { allblogs } };
};

export default Home;
