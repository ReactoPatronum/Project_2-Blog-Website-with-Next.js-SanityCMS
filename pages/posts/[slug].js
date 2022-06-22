/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { client } from "/lib/sanityClient";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import PortableText from "react-portable-text";
import { urlFor } from "/lib/sanityClient";
import { Toaster, toast } from "react-hot-toast";

const Slug = ({ posts }) => {
  const [comment, setComment] = useState(true);
  console.log(posts);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: session } = useSession();
  const onSubmit = (data) => {
    try {
      fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
      }).then(setComment(false));
      toast.success("Yorumunuz Başarıyla Gönderildi!");
    } catch (err) {
      console.log(err);
      setComment(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center">
      <Toaster />
      <div className="flex flex-col items-center">
        <img
          className="object object-contain shadow-green-400 shadow-md"
          src={urlFor(posts.thumbnail).url()}
          alt="img"
        />
        <p className="text-gray-400  mt-2">{posts.publishedAt.slice(0, 10)}</p>
        <h1 className="text-4xl font-semibold m-5">{posts?.title}</h1>

        <PortableText
          projectId="yay1r3oy"
          dataset="production"
          content={posts.body}
          serializers={{
            h1: (props) => (
              <h1
                style={{
                  color: "black",
                  fontSize: "28px",
                  marginBlock: "12px",
                }}
                {...props}
              />
            ),
            li: ({ children }) => (
              <li className="ml-4 list-disc">{children}</li>
            ),
            h4: (props) => (
              <h1
                style={{ fontSizeAdjust: "18px", marginBlock: "24px" }}
                {...props}
              />
            ),
          }}
        />
      </div>

      <hr className="border-purple-500 border-2 w-full" />

      <div className="m-5">
        <div className="h-60 w-80 lg:w-[500px] flex items-center  shadow-2xl rounded-xl p-4">
          <img
            className="w-32 object-contain rounded-full "
            src={urlFor(posts.author.image).url()}
            alt="img"
          />
          <div className="m-5 ">
            <h2 className="text-blue-400 mb-3 font-semibold text-xl">
              {" "}
              {posts.author.name}
            </h2>
            <PortableText
              projectId="yay1r3oy"
              dataset="production"
              content={posts?.author.bio}
              serializers={{
                h1: (props) => <h1 style={{ color: "red" }} {...props} />,
                li: ({ children }) => (
                  <li className="special-list-item">{children}</li>
                ),
              }}
            />
            <p className="mt-4">Daha fazlası için websitemi ziyaret edin.</p>
           
          </div>
        </div>
      </div>
      <hr className="border-purple-500 border-2 w-full" />
      <div className="">
        <h2 className="text-3xl font-semibold mb-2">Yorum Yap</h2>
        {session ? (
          <div>
            <form
              className="flex flex-col"
              key={1}
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("_id")}
                type="hidden"
                name="id"
                value={posts._id}
              />

              <label>
                <input hidden {...register("name")} value={session.user.name} />
              </label>
              <label>
                <input
                  hidden
                  {...register("email")}
                  value={session.user.email}
                />
              </label>
              <label>
                {comment ? (
                  <div className="flex flex-col items-center justify-center">
                    <textarea
                      {...register("comment", { required: true })}
                      rows={6}
                      placeholder="Yorumunuz"
                      className="text-black text-xl w-full lg:w-[500px] resize-none border-2 ring-2 outline-none ring-yellow-200"
                    ></textarea>
                    <button
                      className="mt-3 w-full lg:w-[500px] bg-blue-500 p-2 transition-all duration-200 hover:bg-green-500  "
                      type="submit"
                    >
                      GÖNDER
                    </button>
                  </div>
                ) : (
                  <p className="text-green-500 text-lg">
                    Yorumunuz Onaylandıktan Sonra Paylaşılacaktır Teşekkür
                    Ederiz!
                  </p>
                )}
              </label>
              {errors.comment && (
                <span className="text-red-500">Lütfen Yorum Yapınız.</span>
              )}
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-red-600 text-lg">
              Yorum yapmak için lütfen sağ üstten üye girişi yapınız
            </h1>
            <textarea
              disabled
              rows={6}
              className="resize-none border-2 ring-2 outline-none ring-yellow-200 cursor-not-allowed w-full lg:w-[500px]"
            ></textarea>
          </div>
        )}
      </div>
      <div className="border-2 border-yellow-200 max-w-2xl mx-auto  shadow-yellow-500  mt-10 p-4 mb-4">
        <h2 className="text-xl">Yapılan Yorumlar</h2>
        <hr />
        <div>
          {posts.comments.length > 0 ? (
            posts.comments.map((comment) => (
              <div className="mt-2" key={comment._id}>
                <p>
                  <span className="text-yellow-500 mr-3 font-semibold">
                    {comment.name}:
                  </span>
                  {comment.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="mt-5 ">ilk Yorum Yapan Sen Ol!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slug;

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
        _id,
        slug{
            current
        }
    }`;
  const posts = await client.fetch(query);
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const query = `
    *[_type=="post"&& slug.current=="${context.params.slug}"][0]{
        _id,
        _createdAt,
        name,
        image,
        description,
        mainImage,
        like,
        slug,
        body,
        title,
        publishedAt,
        thumbnail,
        "comments":*[
          _type=="comment"&& post._ref==^._id
        ],
        author->{
            name,image,bio
        }
    }
    `;
  const posts = await client.fetch(query);
  if (!posts) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts,
    },
    revalidate: 600,
  };
};
