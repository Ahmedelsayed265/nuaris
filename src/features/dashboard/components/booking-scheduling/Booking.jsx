import { useState } from "react";
import PageHeader from "../../layout/PageHeader";
import BookingInfoForm from "./BookingInfoForm";
import BoatsPath from "./BoatsPath";
import ActivitiesPath from "./ActivitiesPath";
import TripPackagesPath from "./TripPackagesPath";

const Booking = () => {
  const [path, setPath] = useState("main");
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Booking" />
      </header>
      {path === "main" && <BookingInfoForm setPath={setPath} />}
      {path === "boats" && <BoatsPath setPath={setPath} />}
      {path === "activities" && <ActivitiesPath setPath={setPath} />}
      {path === "trip-packages" && <TripPackagesPath setPath={setPath} />}
    </section>
  );
};

export default Booking;
