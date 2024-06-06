import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (<div key={index}>
          {blog.title === title1 && <div >
            <p>{blog.title}</p>
            <p>{blog.description}</p>
            <p>Author: {blog.author}</p>
          </div>}
        </div>))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default slug
