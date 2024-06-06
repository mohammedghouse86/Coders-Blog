import React, { useEffect, useState } from 'react';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/getblogcontent')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        console.log('this is parsed =', data);
      });
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center ${inter.className}`}>
      { (
        blogs.map((blog, index) => (
          <div key={index}>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <p>Author: {blog.author}</p>
          </div>
        ))
      )}
    </main>
  );
}

export default Blog;
