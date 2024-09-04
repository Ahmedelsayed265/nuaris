import starIcon from "../assets/images/icons/star.svg";
import starFilledIcon from "../assets/images/icons/star-filled.svg";

export default function StarsRate({ rate, reviewsCount }) {
  return (
    <div className="stars_rate">
      <div className="stars">
        {Array(Math.round(rate))
          .fill(0)
          .map(() => {
            return (
              <img key={Math.random()} src={starFilledIcon} alt="filled star" />
            );
          })}
        {Array(5 - Math.round(rate))
          .fill(0)
          .map(() => {
            return <img key={Math.random()} src={starIcon} alt="star" />;
          })}
      </div>
      {reviewsCount && <span>[ {reviewsCount} Reviews ]</span>}
    </div>
  );
}
