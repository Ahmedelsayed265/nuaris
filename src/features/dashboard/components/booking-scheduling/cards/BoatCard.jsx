import boat from "../../../../../assets/images/yacht2.jpeg";
import wallet from "../../../../../assets/images/icons/wallet.svg";
import Badge from './../../../../../ui/Badge';

const BoatCard = ({ handleBook }) => {
  return (
    <div className="booking_card">
      <div className="img">
        <Badge state={1} content={"available"} position={"top-left"} />
        <Badge state={0} content={"Capacity: 10"} position={"top-right"} />
        <img src={boat} alt="activity" />
      </div>
      <div className="about_card">
        <h6 className="title">Santa Maria</h6>
        <div className="price">
          <img src={wallet} alt="wallet" />
          <p>
            <span className="value">100$</span> <span>/ hour</span>
          </p>
        </div>
        <button className="stroked" onClick={handleBook}>
          <span>Book</span>
        </button>
      </div>
    </div>
  );
};

export default BoatCard;
