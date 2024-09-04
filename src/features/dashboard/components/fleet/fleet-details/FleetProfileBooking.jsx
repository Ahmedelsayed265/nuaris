import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import addOnIcon from "../../../../../assets/images/icons/ok.svg";

export default function FleetProfileBooking() {
  const booking = [
    {
      booking_id: "#212",
      customer_name: "Hamad Almamy",
      start_date: "01/01/2024",
      start_time: "3:07 am",
      duration: "2h",
      payment: "visa",
      add_ons: false,
      status: "Confirmed"
    },
    {
      booking_id: "#213",
      customer_name: "Hamad Almamy",
      start_date: "01/01/2024",
      start_time: "3:07 am",
      duration: "2h",
      payment: "visa",
      add_ons: true,
      status: "Canceled"
    },
    {
      booking_id: "#213",
      customer_name: "Hamad Almamy",
      start_date: "01/01/2024",
      start_time: "3:07 am",
      duration: "2h",
      payment: "visa",
      add_ons: true,
      status: "Canceled"
    },
    {
      booking_id: "#213",
      customer_name: "Hamad Almamy",
      start_date: "01/01/2024",
      start_time: "3:07 am",
      duration: "2h",
      payment: "visa",
      add_ons: true,
      status: "Confirmed"
    }
  ];

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.status === "Confirmed" ? (
          <span className="status-success">{rowData.status}</span>
        ) : (
          <span className="status-danger">{rowData.status}</span>
        )}
      </>
    );
  };
  const addnBodyTemplate = (rowData) => {
    return (
      <>{rowData.add_ons ? <img src={addOnIcon} alt="Add-On Icon" /> : ""}</>
    );
  };

  return (
    <div className="col-12 p2">
      <div className="fleet-part">
        <h2>Upcoming booking</h2>
        <div className="table-container">
          <DataTable value={booking}>
            <Column field="booking_id" header="Booking ID" />
            <Column field="customer_name" header="Customer name" />
            <Column field="start_date" header="Start Date" />
            <Column field="start_time" header="Start Time" />
            <Column field="duration" header="Duration" />
            <Column field="payment" header="Payment" />
            <Column field="add_ons" header="Add-Ons" body={addnBodyTemplate} />
            <Column field="status" header="Status" body={statusBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
