"use client"
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image"; // If using Next.js
import type { Swiper as SwiperClass } from "swiper";

interface ResponsiveSliderProps {
  images: string[];
  height?: string;
  objectFit?: string;
}

const ResponsiveSlider: React.FC<ResponsiveSliderProps> = ({
  images,
  height = "h-40",
  objectFit = "object-cover",
}) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div
      className={`w-full ${height}`}
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
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
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              alt={`Slide ${index}`}
              width={1200}
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

