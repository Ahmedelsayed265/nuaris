import { Modal } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

const AddonModal = ({ showModal, setShowModal, data }) => {
  const currency = useSelector((state) => state.user?.user?.currency);
  const tableData = [
    {
      id: "#51465",
      customerName: "Hamad Almamy",
      startDate: "01/01/2024",
      startTime: "3:07 am",
      payment: "cash"
    }
  ];

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Addon Details</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="addOnModal">
          <div className="details">
            <div className="aboutAddOn">
              <div className="img">
                <img
                  src={data?.attachments && data?.attachments[0]?.url}
                  alt={data?.name}
                />
              </div>
              <div className="about">
                <h3>{data?.name}</h3>
                <span>{data?.category}</span>
                <p>{data?.description}</p>
              </div>
            </div>
            <div className="info">
              <div className="info_card">
                <span>Parent Yacht</span>
                <h5>{data?.yacht?.name_en}</h5>
              </div>
              <div className="info_card">
                <span>Quantity</span>
                <h5>{data?.quantity}</h5>
              </div>
              <div className="info_card">
                <span>Price</span>
                <h5>
                  {data?.prices && Number(data?.prices[0]?.price) } {currency || ""}{" "}
                  <span>/ {data?.price_type}</span>
                </h5>
              </div>
            </div>
          </div>
          <div className="statistics">
            <div className="stat_card">
              <h4>
                <CountUp
                  duration={3}
                  start={0}
                  end={data?.total_earnings || 462}
                />
                <span className="d-inline">$</span>
              </h4>
              <h6>Total earnings</h6>
            </div>
            <div className="stat_card">
              <h4>
                <CountUp
                  duration={5}
                  start={0}
                  end={data?.upcoming_booking?.length || 21}
                />
              </h4>
              <h6>Upcoming booking</h6>
            </div>
          </div>
          <div className="upComingBooking">
            <h4>Upcoming Booking</h4>
            <DataTable
              value={data?.upcoming_booking || tableData}
              rows={10}
              className="p-datatable-striped"
            >
              <Column field="id" header="Add On ID" />
              <Column field="customerName" header="Customer name" />
              <Column field="startDate" header="Start Date" />
              <Column field="startTime" header="Start Time" />
              <Column field="payment" header="Payment" />
            </DataTable>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddonModal;
