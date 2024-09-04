import WeatherSlider from "./WeatherSlider";

const Weather = () => {
  return (
    <div className="weather_container">
      <div className="header">
        <h6>
          <span>Friday</span> <span>11:45 AM</span>
        </h6>
        <div className="swiper_controls">
          <div className="btns">
            <button className="weather_swiper-button-prev">
              <i className="fa-regular fa-angle-left"></i>
            </button>
            <button className="weather_swiper-button-next">
              <i className="fa-regular fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <WeatherSlider />
      </div>
    </div>
  );
};

export default Weather;
