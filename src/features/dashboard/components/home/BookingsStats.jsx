import { Link } from "react-router-dom";
import shareImg from "../../../../assets/images/icons/share-icon.svg";

function BookingsStats() {
  return (
    <div className="bg_white_card">
      <div className="m-0">
        <div className="col-12 p-2 d-flex justify-content-between align-items-center">
          <h6 className="form_title">Bookings</h6>
          <select className="styled_select">
            <option>Today</option>
            <option>Tomorrow</option>
            <option>Yesterday</option>
          </select>
        </div>
      </div>
      <div className="bookings-stats-content">
        <div className="bookings-stats-specific">
          <div className="bookings-stats-specific-boxes">
            <div className="bg-light-gray bookings-stats-box">
              <h5>9</h5>
              <p>Cash Bookings 17</p>
            </div>
            <div className="bg-light-gray bookings-stats-box">
              <h5>9</h5>
              <p>Agents Bookings 24</p>
            </div>
            <div className="bg-light-gray bookings-stats-box">
              <h5>9</h5>
              <p>Card Booking 35</p>
            </div>
            <div className="bg-light-gray bookings-stats-box">
              <h5>9</h5>
              <p>Nuaris Partners 18</p>
            </div>
          </div>
          <div className="bg-light-gray bookings-stats-complaints-box">
            <div className="box-header">
              <p>Complaints</p>
              <Link href="" className="share-icon-box">
                <img src={shareImg} alt="share complaints" />
              </Link>
            </div>
            <div className="box-content">
              <h5>9</h5>
              <p>3 Have been solved</p>
            </div>
            <button className="complaints-button">
              user-submitted complaints
            </button>
          </div>
        </div>
        <div className="bookings-stats-total">
          <div className="bg-gray bookings-stats-total-box">
            <p>Bookings</p>
            <h5>9</h5>
          </div>
          <div className="bg-gray bookings-stats-total-box">
            <p>Revenue</p>
            <h5>8399$</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingsStats;
