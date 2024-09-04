import activity from "../../../../../assets/images/yacht1.jpeg";
import wallet from "../../../../../assets/images/icons/wallet.svg";
import Badge from "../../../../../ui/Badge";

const ActivityCard = ({ handleBook }) => {
  return (
    <div className="booking_card">
      <div className="img">
        <Badge state={1} content={"available"} position={"top-left"} />
        <Badge state={0} content={"Capacity: 8"} position={"top-right"} />
        <img src={activity} alt="activity" />
      </div>
      <div className="about_card">
        <h6 className="title">Maritime Adventures</h6>
        <div className="price">
          <img src={wallet} alt="wallet" />
          <p>
            <span className="value">100$</span> <span>/ hour</span>
          </p>
        </div>
        <div className="duration">
          <p>Duration: </p>
          <b>3 days</b>
        </div>
        <button className="stroked" onClick={handleBook}>
          <span>Book</span>
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
