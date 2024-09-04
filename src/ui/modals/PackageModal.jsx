import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import packageImg from "../../assets/images/package.jpg";
import CountUp from "react-countup";
import axiosInstance from "../../utils/axiosInstance";
import StarsRate from "./../StarsRate";

const PackageModal = ({ showModal, setShowModal, data }) => {
  const [status, setStatus] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    setStatus(data?.status === "active" ? true : false);
  }, [data?.status]);
  const tableData = [
    {
      id: "#51465",
      customerName: "Hamad Almamy",
      startDate: "01/01/2024",
      startTime: "3:07 am",
      payment: "cash"
    }
  ];

  const handleSwitchStatus = async (e) => {
    setStatus(e.target.checked);
    const newStatus = e.target.checked ? "active" : "inactive";
    const res = await axiosInstance.patch(`/trip-packages/${data?.id}/`, {
      status: newStatus
    });
    if (res.status === 200) {
      queryClient.invalidateQueries(["trip-packages"]);
      toast.success(
        newStatus === "active" ? "Package Activated" : "Package Deactivated"
      );
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Package Details</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="addOnModal mdl trip_packages">
          <div className="details">
            <div className="aboutAddOn">
              <div className="img">
                <img
                  src={data?.attachments?.[0] || packageImg}
                  alt={data?.name}
                  loading={"lazy"}
                />
              </div>
              <div className="about">
                <div className="header">
                  <h3 className="m-0">{data?.name}</h3>
                  <Form.Check
                    type="switch"
                    checked={status}
                    onChange={handleSwitchStatus}
                  />
                </div>
                <StarsRate rate={data?.overall_rate || 2} />
                <p>
                  {data?.description ||
                    `Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Laborum ipsum assumenda praesentium
                  corrupti, exercitationem ea voluptatem, omnis, voluptate
                  quisquam harum alias cum eveniet a voluptatibus dicta
                  voluptates beatae? Quo, nihil!`}
                </p>
                <div className="modal_addons_connected">
                  <h5>Addons Connected</h5>
                  <div>
                    {data?.addons.map((item) => {
                      return (
                        <div key={item.id}>
                          {item?.addon?.name} <span>x{item.quantity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="info">
              <div className="info_card">
                <span>Parent Yacht</span>
                <h5>{data?.parent_yacht_name || "Liver"}</h5>
              </div>
              <div className="info_card">
                <span>Price</span>
                <h5>
                  ${data?.price} <span>/ {data?.price_type}</span>
                </h5>
              </div>
              <div className="info_card">
                <span>Date Added</span>
                <h5>{data?.date_added}</h5>
              </div>
              <div className="info_card">
                <span>Last ordered</span>
                <h5>{data?.last_ordered}</h5>
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
                  end={data?.times_requested || 21}
                />
              </h4>
              <h6>Times Requested</h6>
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
              {/* <Column field="phoneNumber" header="Phone Number" />
              <Column field="bookingQuantity" header="Booking Quantity" /> */}
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

export default PackageModal;
