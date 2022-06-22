import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { client,urlFor } from "/lib/sanityClient";

const blogs = ({data}) => {
  return (
    <div className="mt-7 min-h-screen flex flex-col items-center mx-auto">
      <h1 className="mb-12 text-3xl font-semibold">TÜM POSTLAR</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl xl:grid-cols-3 gap-3 md:gap-6 ">
        {data.map((data) => (
         <Link href={`/posts/${data.slug.current}`}  key={data._id}>
          <div className="shadow-purple-500 shadow-2xl  rounded-md cursor-pointer">
            <h2 className="text-xl font-medium mb-4 ">{data.title}</h2>
            <Image objectFit="cover" height={150} width={230} layout="responsive" alt="image" src={urlFor(data.mainImage).url()} />
           
          </div>
         </Link>
        ))}
        
      </div>
    </div>
  );
}

export default blogs


export const getServerSideProps = async () => {
  const query = `
  *[_type=="post"]{
    _id,
    title,
    description,
    mainImage,
    slug,
    image,
    author->{
    image,name,bio
  }
  }
  `;
  
  const data = await client.fetch(query);
 
  
  return {
    props: {
      data,
     
    },
  };
};