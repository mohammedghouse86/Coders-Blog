import { Inter } from "next/font/google";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Style from "../../styles/rashidStyles.module.css";
const inter = Inter({ subsets: ["latin"] });
const slug = () => {

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/getblogcontent')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);



  const router = useRouter();
  const { slug } = router.query;
  const title1 = slug
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

export default slug
