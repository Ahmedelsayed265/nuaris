import { Link, useParams } from "react-router-dom";
import editIcon from "../../../../../assets/images/icons/edit.svg";
import shareIcon from "../../../../../assets/images/icons/share.svg";
import PageHeader from "../../../layout/PageHeader";
import FleetProfileMedia from "./FleetProfileMedia";
import FleetProfileInfo from "./FleetProfileInfo";
import FleetProfileTabs from "./FleetProfileTabs";
import FleetProfileBooking from "./FleetProfileBooking";
import FleetVesselLogbook from "./FleetVesselLogbook";
import useGetYachtById from "../../../../../hooks/useGetYachtById";
import TableLoader from "../../../../../ui/loaders/TableLoader";

export default function FleetProfile() {
  const { id } = useParams();
  const { data: fleet, isLoading } = useGetYachtById(id);

  return isLoading ? (
    <TableLoader />
  ) : (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader currentName={fleet?.name_en} name={fleet?.name_en} />
        <div className="utility-buttons">
          <Link to={`/dashboard/fleet/edit-yacht/${id}/`}>
            <img src={editIcon} alt="edit icon" />
            Edit
          </Link>
          <button>
            <img src={shareIcon} alt="share icon" />
            Share
          </button>
        </div>
      </header>
      <div className="row m-0">
        <FleetProfileMedia fleet={fleet} />
        <FleetProfileInfo fleet={fleet} />
        <FleetProfileTabs fleet={fleet} />
        <FleetProfileBooking fleet={fleet} />
        <FleetVesselLogbook />
      </div>
    </section>
  );
}
