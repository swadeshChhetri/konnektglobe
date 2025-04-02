// "use client"; // Required for client-side interactivity

// import Image from "next/image";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { useRef } from "react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";

// export default ResponsiveSlider = ({images, height = "h-40", objectFit = "object-cover"}) => {
//   const swiperRef = useRef(null);

//   return (
//     <div className={`w-full ${height}`}
//       onMouseEnter={() => swiperRef.current?.autoplay.stop()} // Stop autoplay on hover
//       onMouseLeave={() => swiperRef.current?.autoplay.start()} // Resume autoplay when mouse leaves
//     >
//       <Swiper
//         ref={swiperRef}
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={50}
//         slidesPerView={1}
//         navigation={{
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-prev",
//         }}
//         pagination={{
//           clickable: true,
//           el: ".swiper-pagination",
//           bulletClass: "swiper-pagination-bullet",
//           bulletActiveClass: "swiper-pagination-bullet-active",
//         }}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//         loop={true}
//         className="relative group w-full h-full" 
//         onSwiper={(swiper) => (swiperRef.current = swiper)} // Store the swiper instance
//       >
//         {images.map(img, index) => (

// <SwiperSlide key={index}>
// {/* <div className="h-full bg-gray-100 text-center"> */}
//   <Image
//     src={img} // Replace with your actual image path
//     alt="Slide 2 Image"
//     width={500}
//     height={300}
//     className={`w-full h-full ${objectFit}`} alt={`slide ${index}`} // Ensures full coverage
//   />
// {/* </div> */}
// </SwiperSlide>

//         ))}
  
//       </Swiper>
//     </div>
//   );
// };







{/* <SwiperSlide>
{/* <div className="h-full bg-gray-200 text-center"> *
  <Image
    src="/B2B/slide1.webp"
    alt="Slide 1"
    width={500}
    height={300}
    className="w-full h-full object-cover"
  />
{/* </div> *
</SwiperSlide>

<SwiperSlide>
{/* <div className="h-full bg-gray-300 text-center"> *
  <Image
    src="/B2B/slide2.jpeg"
    alt="Slide 1"
    width={500}
    height={300}
    className="w-full h-full object-cover"
  />
{/* </div> *
</SwiperSlide>

{/* Navigation Buttons *
<div className="swiper-button-next opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
<div className="swiper-button-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

{/* Pagination Dots *
<div className="swiper-pagination !bottom-0"></div> */}


import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image"; // If using Next.js

const ResponsiveSlider = ({ images = [], height = "h-40", objectFit = "object-cover" }) => {
  const swiperRef = useRef(null);

  return (
    <div 
      className={`w-full ${height}`} 
      onMouseEnter={() => swiperRef.current?.autoplay.stop()} 
      onMouseLeave={() => swiperRef.current?.autoplay.start()}
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="relative group w-full h-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              alt={`Slide ${index}`}
              width= {1200}
              height={300}
              className={`w-full h-full ${objectFit}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ResponsiveSlider;


