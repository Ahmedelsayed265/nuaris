import FleetMediaSwiper from "./FleetMediaSwiper";
import MapCard from "./../../../../../ui/MapCard";

export default function FleetProfileMedia({ fleet }) {
  return (
    <>
      <div className="col-lg-5 col-12 p-2">
        <FleetMediaSwiper
          state={fleet?.state}
          media={{ images: fleet?.images, video: fleet?.video_link }}
        />
      </div>
      <div className="col-lg-auto flex-grow-1 col-12 p-2">
        <MapCard
          title={"Vessel Location"}
          location={`${fleet?.city}, ${fleet?.country?.name}`}
          lat={fleet?.location?.lat}
          lng={fleet?.location?.lng}
        />
      </div>
      <div className="col-lg-auto flex-grow-1 col-12 p-2">
        <MapCard
          title={"Meeting Client Place"}
          location={`${fleet?.city}, ${fleet?.country?.name}`}
          lat={fleet?.meeting_location?.lat}
          lng={fleet?.meeting_location?.lng}
        />
      </div>
    </>
  );
}
