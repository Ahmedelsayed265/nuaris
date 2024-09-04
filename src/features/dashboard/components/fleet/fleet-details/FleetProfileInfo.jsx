import { useState } from "react";
import { useSelector } from "react-redux";
import fleetIcon from "../../../../../assets/images/icons/Fleet.svg";
import crowdIcon from "../../../../../assets/images/icons/crowd.svg";
import walledIcon from "../../../../../assets/images/icons/wallet.svg";
import captainIcon from "../../../../../assets/images/icons/captain.svg";
import hashIcon from "../../../../../assets/images/icons/hash.svg";
import FleetInfoMiniCard from "./FleetInfoMiniCard";
import StarsRate from './../../../../../ui/StarsRate';
import RateModal from "../../../../../ui/modals/RateModal";

export default function FleetProfileInfo({ fleet }) {
  const [isOpen, setIsOpen] = useState(false);
  const currency = useSelector((state) => state.user?.user?.currency);

  const getCrewGenders = () => {
    const genders = fleet?.crews?.map((crew) => crew?.gender);
    const allMale = genders?.every((gender) => gender.toLowerCase() === "male");
    const allFemale = genders?.every(
      (gender) => gender.toLowerCase() === "female"
    );
    if (allMale) {
      return "male";
    } else if (allFemale) {
      return "female";
    } else {
      return "both";
    }
  };

  return (
    <div className="col-12 p-2">
      <div className="fleet-part">
        <div className="fleet-info-row">
          <div className="d-flex align-items-center justify-content-between">
            <button onClick={() => setIsOpen(true)}>
              <StarsRate rate={"4.2"} reviewsCount={"25"} />
            </button>
            <div className="fleet_tag">
              <img src={hashIcon} alt="hash" /> <p>{"564231"}</p>
            </div>
          </div>
          <RateModal isOpen={isOpen} setIsOpen={setIsOpen} />
          <h2 className="text-capitalize">{fleet?.name_en}</h2>
          <div className="fleet_details">
            <FleetInfoMiniCard
              icon={fleetIcon}
              title="Boat Type"
              text={fleet?.type}
            />
            <FleetInfoMiniCard
              icon={crowdIcon}
              title="Capacity"
              text={fleet?.capacity}
            />
            <FleetInfoMiniCard
              icon={walledIcon}
              title="Price"
              text={
                fleet?.prices?.length > 0
                  ? fleet.prices[0].price + " " + currency
                  : ""
              }
              per={fleet?.prices?.length > 0 ? fleet.prices[0].period_type : ""}
            />
            <FleetInfoMiniCard
              icon={captainIcon}
              title="Crew"
              text={fleet?.crews?.length}
              crewGenders={getCrewGenders()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
