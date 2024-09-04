import React from "react";

const PackageReservations = () => {
  return (
    <div className="reservations">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="title">
            Reservations
            <div className="bookType">
              <p className="availble">Available</p>
              <p className="fullyBooked">Fully Booked</p>
            </div>
          </h6>
        </div>
        <div className="col-lg-4 col-12 p-2">
          <div className="reservation_card availble">
            <p>4 Available</p>
            <h6>
              Start <span>01/01/2024 02:30 pm</span>
            </h6>
            <h6>
              End <span>01/01/2024 03:00 pm</span>
            </h6>
          </div>
        </div>
        <div className="col-lg-4 col-12 p-2">
          <div className="reservation_card reserv">
            <p>0 Available</p>
            <h6>
              Start <span>01/01/2024 02:30 pm</span>
            </h6>
            <h6>
              End <span>01/01/2024 03:00 pm</span>
            </h6>
          </div>
        </div>
        <div className="col-lg-4 col-12 p-2">
          <div className="reservation_card reserv">
            <p>0 Available</p>
            <h6>
              Start <span>01/01/2024 02:30 pm</span>
            </h6>
            <h6>
              End <span>01/01/2024 03:00 pm</span>
            </h6>
          </div>
        </div>
        <div className="col-lg-4 col-12 p-2">
          <div className="reservation_card availble">
            <p>4 Available</p>
            <h6>
              Start <span>01/01/2024 02:30 pm</span>
            </h6>
            <h6>
              End <span>01/01/2024 03:00 pm</span>
            </h6>
          </div>
        </div>
        <div className="col-lg-4 col-12 p-2">
          <div className="reservation_card availble">
            <p>4 Available</p>
            <h6>
              Start <span>01/01/2024 02:30 pm</span>
            </h6>
            <h6>
              End <span>01/01/2024 03:00 pm</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageReservations;
