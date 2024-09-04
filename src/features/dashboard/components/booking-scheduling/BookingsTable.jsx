import { useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";
import deleteIcon from "../../../../assets/images/icons/delete.svg";
import editIcon from "../../../../assets/images/icons/edit.svg";
import eyeView from "../../../../assets/images/icons/eye.svg";
// import BoatPathBooking from "./modals/BoatPathBooking";
// import ActivityPathBooking from "./modals/ActivityPathBooking";
// import TripPackagePathBooking from "./modals/TripPackagePathBooking";

const BookingsTable = () => {
  const [filter, setFilter] = useState("upcoming");
  const [showBoatBookingModal, setShowBoatBookingModal] = useState(false);
  const [showActivityBookingModal, setShowActivityBookingModal] =
  useState(false);
  const [showTripPackageBookingModal, setShowTripPackageBookingModal] =
  useState(false);
  const currency = useSelector((state) => state.user?.user?.currency);

  const testData = [
    {
      id: 1,
      name: "Mahmoud gamal",
      destination: "Riyadh, Saudi Arabia",
      path: "Activities Path",
      no_of_clients: 10,
      payment: "Full",
      price: 1000,
      price_type: "person"
    },
    {
      id: 1,
      name: "Ahmed Elsayed",
      destination: "Riyadh, Saudi Arabia",
      path: "Trip package path",
      no_of_clients: 10,
      payment: "Advanced (50%)",
      price: 1000,
      price_type: "person"
    },
    {
      id: 1,
      name: "Mohamed Elashry",
      destination: "Riyadh, Saudi Arabia",
      path: "Boats Path",
      no_of_clients: 10,
      payment: "Advanced (50%)",
      price: 1000,
      price_type: "person"
    }
  ];

  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button>
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Button>
          <img src={editIcon} alt="edit" />
        </Button>
        <Button
          onClick={() => {
            if (rowData?.path === "Trip package path") {
              setShowTripPackageBookingModal(true);
            } else if (rowData?.path === "Boats Path") {
              setShowBoatBookingModal(true);
            } else if (rowData?.path === "Activities Path") {
              setShowActivityBookingModal(true);
            }
          }}
        >
          <img src={eyeView} alt="view" />
        </Button>
      </div>
    );
  };

  const priceTemplate = (item) => {
    return (
      <div className="price_template">
        <h4>
          {item.price} {currency}{" "}
        </h4>
        <span>/ {item.price_type}</span>
      </div>
    );
  };

  return (
    <>
      <div className="col-12 p-2">
        <div className="bookings_filter">
          <span className={`activeTab ${filter}`} />
          <div
            className={`tab ${filter === "upcoming" ? "active" : ""}`}
            onClick={() => setFilter("upcoming")}
          >
            <h6>Upcoming bookings</h6>
          </div>
          <div
            className={`tab ${filter === "previous" ? "active" : ""}`}
            onClick={() => setFilter("previous")}
          >
            <h6>Previous bookings</h6>
          </div>
          <div
            className={`tab ${filter === "canceled" ? "active" : ""}`}
            onClick={() => setFilter("canceled")}
          >
            <h6>Canceled bookings</h6>
          </div>
        </div>
      </div>
      <div className="col-12 p-2">
        <div className="table-container p-relative">
          <DataTable value={testData}>
            <Column field="name" header="Name" />
            <Column field="destination" header="Destination" />
            <Column field="path" header="Path" />
            <Column field="no_of_clients" header="Number of clients" />
            <Column field="payment" header="Payment" />
            <Column body={priceTemplate} header="Price" />
            <Column body={ActionTemplate} header="Actions" />
          </DataTable>
        </div>
      </div>
      {/* <BoatPathBooking
        showModal={showBoatBookingModal}
        setShowModal={setShowBoatBookingModal}
      />
      <TripPackagePathBooking
        showModal={showTripPackageBookingModal}
        setShowModal={setShowTripPackageBookingModal}
      />
      <ActivityPathBooking
        showModal={showActivityBookingModal}
        setShowModal={setShowActivityBookingModal}
      /> */}
    </>
  );
};

export default BookingsTable;
