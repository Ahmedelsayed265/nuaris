import SupplyDemandChart from "./SupplyDemandChart";

function SupplyDemand() {
  return (
    <div className="bg_white_card supply-demands-section">
      <div className="m-0">
        <div className="col-12 p-2 d-flex justify-content-between align-items-center">
          <h6 className="form_title">Supply & Demand Chart</h6>
          <select className="styled_select">
            <option>All Bookings</option>
            <option>Bookings</option>
          </select>
        </div>
      </div>
      <SupplyDemandChart />
    </div>
  );
}

export default SupplyDemand;
