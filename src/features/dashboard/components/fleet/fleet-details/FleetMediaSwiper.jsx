import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Badge from "../../../../../ui/Badge";

export default function FleetMediaSwiper({ media, state }) {
  const videoRef = useRef(null);
  const [autoplayDelay, setAutoplayDelay] = useState(2500);

  let badge;

  switch (state) {
    case "Active":
      badge = <Badge state={1} content={"Available"} />;
      break;
    case "Hidden":
      badge = <Badge state={0} content={"Hidden"} />;
      break;
    case "Inactive":
      badge = <Badge state={2} content={"Inactive"} />;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        const videoDuration = videoRef.current.duration * 1000;
        setAutoplayDelay(videoDuration);
      };
    }
  }, [media?.video]);

  return (
    <div className="fleet-media-swiper">
      {badge}
      <Swiper
        spaceBetween={30}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        pagination={{
          clickable: true
        }}
        modules={[Pagination, EffectFade, Autoplay]}
        className="mySwiper"
        onSlideChange={(swiper) => {
          if (swiper.realIndex === 0 && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setAutoplayDelay(videoRef.current.duration * 1000);
          } else {
            setAutoplayDelay(2500);
          }
        }}
      >
        {media?.video && (
          <SwiperSlide>
            <video
              ref={videoRef}
              src={media?.video}
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </SwiperSlide>
        )}
        {media?.images?.map((image) => (
          <SwiperSlide key={image?.url}>
            <img src={image.url} alt="yacht" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
