import React from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { urlFor } from "/lib/sanityClient";
import { useRouter } from "next/router";

const Slider = ({ articles }) => {
  const router = useRouter();
  return (
    <div className="col-span-6 md:col-span-4 ">
      <div>
        <Carousel
          autoPlay
          infiniteLoop
          showArrows={true}
          showIndicators={true}
          showThumbs={false}
          interval={3000}
        >
          <div
            onClick={() => router.push(`posts/${articles[0].slug.current}`)}
            className="cursor-pointer"
          >
            <Image
              height={70}
              width={110}
              loading="lazy"
              objectFit="cover"
              alt=""
              src={urlFor(articles[0].mainImage).url()}
              layout="responsive"
            />
          </div>
          <div
            onClick={() => router.push(`posts/${articles[1].slug.current}`)}
            className="cursor-pointer"
          >
            <Image
              height={70}
              width={110}
              loading="lazy"
              objectFit="cover"
              alt=""
              src={urlFor(articles[1].mainImage).url()}
              layout="responsive"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
