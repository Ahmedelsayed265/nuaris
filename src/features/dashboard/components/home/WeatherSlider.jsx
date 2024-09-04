import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import weatherIcon from "../../../../assets/images/icons/weather-icon.png";

function WeatherSlider() {
  return (
    <Swiper
      spaceBetween={24}
      slidesPerView={1}
      speed={1000}
      loop={true}
      modules={[Navigation, EffectFade, Autoplay]}
      effect="fade"
      navigation={{
        nextEl: ".weather_swiper-button-next",
        prevEl: ".weather_swiper-button-prev",
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <div className="slide-header">
          <figure className="img-container">
            <img src={weatherIcon} alt="weather icon" />
          </figure>
          <h3>16&deg;</h3>
        </div>
        <div className="slide_content">
          <div className="slide_content_box">
            <p>
              Wind N-E. <span>6-7km/h</span>
            </p>
            <p>
              Pressure <span>100MB</span>
            </p>
            <p>
              Sunrise <span>5:30AM</span>
            </p>
          </div>
          <div className="slide_content_box">
            <p>
              Real Feel <span>18&deg;</span>
            </p>
            <p>
              Humidity <span>51%</span>
            </p>
            <p>
              Sunset <span>6:45</span>
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-header">
          <figure className="img-container">
            <img src={weatherIcon} alt="weather icon" />
          </figure>
          <h3>20&deg;</h3>
        </div>
        <div className="slide_content">
          <div className="slide_content_box">
            <p>
              Wind N-E. <span>6-7km/h</span>
            </p>
            <p>
              Pressure <span>100MB</span>
            </p>
            <p>
              Sunrise <span>5:30AM</span>
            </p>
          </div>
          <div className="slide_content_box">
            <p>
              Real Feel <span>18&deg;</span>
            </p>
            <p>
              Humidity <span>51%</span>
            </p>
            <p>
              Sunset <span>6:45</span>
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-header">
          <figure className="img-container">
            <img src={weatherIcon} alt="weather icon" />
          </figure>
          <h3>22&deg;</h3>
        </div>
        <div className="slide_content">
          <div className="slide_content_box">
            <p>
              Wind N-E. <span>6-7km/h</span>
            </p>
            <p>
              Pressure <span>100MB</span>
            </p>
            <p>
              Sunrise <span>5:30AM</span>
            </p>
          </div>
          <div className="slide_content_box">
            <p>
              Real Feel <span>18&deg;</span>
            </p>
            <p>
              Humidity <span>51%</span>
            </p>
            <p>
              Sunset <span>6:45</span>
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default WeatherSlider;
