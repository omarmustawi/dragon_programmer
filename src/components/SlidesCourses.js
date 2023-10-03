// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import Course from "./Course";

export default function SlidesCourses({ courses }) {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      pagination={{ clickable: true }}
      breakpoints={{
        // when window width is >= 0px
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        // when window width is >= 646px
        646: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        // when window width is >= 800px

        800: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        // when window width is >= 1100px

        1100: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      }}
      autoplay={{ delay: 4000 }}
      navigation
      scrollbar={{ draggable: true }}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {courses.map((course) => (
        <SwiperSlide key={course.id}>
          <Course
            id={course.id}
            teacher_id={course.teacher_id}
            imgIntro={course.image}
            title={course.title}
            level={course.level}
            description={course.description}
            price={course.price}
            teacher={course.teacher}
            term={course.hours}
            subscribe={course.subscribe}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
