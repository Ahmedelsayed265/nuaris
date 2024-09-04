import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s1 from "../../../../assets/images/s1.png";
import s2 from "../../../../assets/images/s2.png";
import s3 from "../../../../assets/images/s3.png";

const AnnouncementsSlider = () => {
  return (
    <Swiper
      spaceBetween={24}
      slidesPerView={1}
      speed={1000}
      loop={true}
      modules={[Navigation, EffectFade, Autoplay, Pagination]}
      effect="fade"
      navigation={{
        nextEl: ".announcements_swiper-button-next",
        prevEl: ".announcements_swiper-button-prev",
      }}
      pagination={{
        el: ".announcements-pagination",
        clickable: true,
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <div className="img">
          <img src={s1} alt="s1" />
        </div>
        <div className="slide_content">
          <p>
            Ut sodales, ex sit amet consectetur accumsan, nibh ex
            sollicitudin metus, volutpat lacinia arcu nibh vel ante. Proin
            dapibus dui eget justo tincidunt eleifend.
          </p>
          <button>
            Learn More <i className="fa-regular fa-angle-right"></i>
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="img">
          <img src={s2} alt="s1" />
        </div>
        <div className="slide_content">
          <p>
            Ut sodales, ex sit amet consectetur accumsan, nibh ex
            sollicitudin metus, volutpat lacinia arcu nibh vel ante. Proin
            dapibus dui eget justo tincidunt eleifend.
          </p>
          <button>
            Learn More <i className="fa-regular fa-angle-right"></i>
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="img">
          <img src={s3} alt="s1" />
        </div>
        <div className="slide_content">
          <p>
            Ut sodales, ex sit amet consectetur accumsan, nibh ex
            sollicitudin metus, volutpat lacinia arcu nibh vel ante. Proin
            dapibus dui eget justo tincidunt eleifend.
          </p>
          <button>
            Learn More <i className="fa-regular fa-angle-right"></i>
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default AnnouncementsSlider;
