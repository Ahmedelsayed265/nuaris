import Badge from "../../../../../ui/Badge";
import packageImg from "../../../../../assets/images/package.jpg";
import wallet from "../../../../../assets/images/icons/wallet.svg";

const TripPackageCard = ({ handleBook }) => {
  return (
    <div className="booking_card">
      <div className="img">
        <Badge state={1} content={"available"} position={"top-left"} />
        <Badge state={0} content={"Capacity: 4"} position={"top-right"} />
        <img src={packageImg} alt="package" />
      </div>
      <div className="about_card">
        <h6 className="title">Sunset Cruise Special</h6>
        <div className="price">
          <img src={wallet} alt="wallet" />
          <p>
            <span className="value">100$</span> <span>/ hour</span>
          </p>
        </div>
        <div className="duration">
          <p>Duration: </p>
          <b>4 days</b>
        </div>
        <button className="stroked" onClick={handleBook}>
          <span>Book</span>
        </button>
      </div>
    </div>
  );
};

export default TripPackageCard;
