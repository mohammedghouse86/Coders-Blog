import { Inter } from "next/font/google";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Style from "../../styles/rashidStyles.module.css";
const inter = Inter({ subsets: ["latin"] });
import * as fs from 'fs'; //this is to import file reader fs
const slug = (props) => {

  const [blogs, setBlogs] = useState([]);
  //console.log('this is props=',props.data1);

  useEffect(() => {
    setBlogs(props.data1)
  }, [])



  const router = useRouter();
  const { slug } = router.query;
  const title1 = slug
  console.log('hey man this is the slug =', slug);
  return (
    <main
      className={`flex min-h-screen flex-col items-center  ${inter.className}`} /*justify-between p-24 removed*/
    >

      <div className={Style.container}>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (<div key={index}>
            {blog.title === title1 && <div >
              <div className={Style.h2}>{blog.title}</div>
              <div className={Style.para}>{blog.description}</div>
              <div className={Style.h3}>Author: {blog.author}</div>
            </div>}
          </div>))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  )
}
export async function getStaticPaths() {
  let data = await fs.promises.readdir('blogpost')
  let myfile;
  let data1 = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(('blogpost/' + item), 'utf-8')
    data1.push(JSON.parse(myfile))
  }
  let myfile1;
  let path_arr = [];
  for(let index = 0; index <data1.length; index++) {
    myfile1 ={ params: { slug: data1[index].title } }
    path_arr.push(myfile1);}
    console.log('these are myfile =', path_arr)
  return {
    paths: path_arr,
    fallback: true // false or 'blocking
  };
}

export async function getStaticProps(context) {
  console.log("yoyoyoyooyoyoyoyoyoyoooooyoyoyo  this is the context = ",context)
  let data = await fs.promises.readdir('blogpost')
  let myfile;
  let data1 = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(('blogpost/' + item), 'utf-8')
    data1.push(JSON.parse(myfile))
  }
  //console.log('these are data1 =', data1)
  return { props: { data1 } }
}

export default slug
