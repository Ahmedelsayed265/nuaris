import { useEffect, useState } from "react";
import { Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { DAYS } from "../../../../utils/constants";
import PageHeader from "../../layout/PageHeader";
import SideBar from "../../components/fleet/SideBar";
import MainInfo from "../../components/fleet/MainInfo";
import Media from "../../components/fleet/Media";
import BoatSpecification from "../../components/fleet/BoatSpecification";
import WorkingHours from "../../components/fleet/WorkingHours";
import Pricing from "../../components/fleet/Pricing";
import AddOnsConnected from "../../components/fleet/AddOnsConnected";
import MoreInfo from "../../components/fleet/MoreInfo";
import VesselStatusForm from "../../components/fleet/VesselStatusForm";
import useGetYachtById from "./../../../../hooks/useGetYachtById";

export default function FleetForm() {
  const [formData, setFormData] = useState({});
  const [searchParams] = useSearchParams();
  const createdYachtId = searchParams.get("yacht_id");
  const { id } = useParams();
  const { data: yacht } = useGetYachtById(createdYachtId || id);

  const initialMemberData = {
    name: "",
    gender: "male",
    nationality: "SA"
  };

  const workingHoursInitial = DAYS.map((day, index) => ({
    day,
    index,
    selected: false,
    hours: [{ from_time: "00:00", to_time: "00:00" }]
  }));

  const initialPricesData = {
    period_id: "",
    price: "",
    extra_hour_price: "",
    minimum_price: ""
  };

  const seasonCardInitialData = {
    advance_payment_percentage: 100,
    minimum_rental_period: "",
    period_id: "",
    price: "",
    extra_hour_price: "",
    minimum_price: "",
    dates: [new Date()]
  };

  useEffect(() => {
    const newWorkingHours = workingHoursInitial.map((item) => {
      const yachtWorkingHour = yacht?.working_hours?.working_hours?.find(
        (yachtHour) => yachtHour.day === item.day
      );
      if (yachtWorkingHour) {
        return {
          ...item,
          hours: yachtWorkingHour?.hours,
          selected: true
        };
      }
      return item;
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      brand: yacht?.brand || "",
      category_id: yacht?.category_id || "",
      type: yacht?.type || "",
      name_en: yacht?.name_en || "",
      name_ar: yacht?.name_ar || "",
      fleet_number: yacht?.fleet_number || "",
      license_number: yacht?.license_number || "",
      license_file: yacht?.license_file || "",
      license_expire_date: yacht?.license_expire_date || "",
      description_en: yacht?.description_en || "",
      description_ar: yacht?.description_ar || "",
      preparation_time: yacht?.preparation_time || "",
      country: yacht?.country?.name || "",
      city: yacht?.city || "",
      marina: yacht?.marina || "",
      location: yacht?.location || {
        address: "",
        lat: 24.7136,
        lng: 46.6753
      },
      meeting_location: yacht?.meeting_location || {
        address: "",
        lat: 24.7136,
        lng: 46.6753
      },
      crew: yacht?.crews?.length > 0 ? yacht?.crews : [initialMemberData],
      policy: {
        cancellation_policy: yacht?.policy[0]?.cancellation_policy || [
          {
            cancel_before: "",
            percentage: "",
            type: "minutes"
          }
        ],
        weather_restrictions: yacht?.policy[0]?.weather_restrictions || "",
        rules_and_instructions: yacht?.policy[0]?.rules_and_instructions || "",
        allowed_and_not_allowed_items:
          yacht?.policy[0]?.allowed_and_not_allowed_items
      },
      images: yacht?.images?.map((img) => img?.url || "") || Array(5).fill(""),
      video_link: yacht?.video_link || "",
      capacity: yacht?.capacity || "",
      year_of_manufacture: yacht?.year_of_manufacture || "",
      depth: yacht?.depth || "",
      length: yacht?.length || "",
      engine_quantity: yacht?.engine_quantity || "",
      engine_size: yacht?.engine_size || "",
      fuel: yacht?.fuel || "",
      bathrooms: yacht?.bathrooms || "",
      sleeping_cabins: yacht?.sleeping_cabins || "",
      single_beds: yacht?.single_beds || "",
      double_beds: yacht?.double_beds || "",
      queen_beds: yacht?.queen_beds || "",
      king_beds: yacht?.king_beds || "",
      sofa_beds: yacht?.sofa_beds || "",
      accept_sleeping_arrangement: yacht?.accept_sleeping_arrangement || false,
      working_hours: newWorkingHours,
      price_upon_request: yacht?.price_upon_request || false,
      advance_payment_percentage: yacht?.advance_payment_percentage || 100,
      minimum_rental_period: yacht?.minimum_rental_period?.id || "",
      min__type: yacht?.minimum_rental_period?.type || "",
      prices: yacht?.prices?.length > 0 ? yacht?.prices : [initialPricesData],
      season_prices:
        yacht?.season_prices?.length > 0
          ? yacht?.season_prices
          : [seasonCardInitialData],
      vat_id: yacht?.vat_id || ""
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yacht]);

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader
          name={id ? "Edit yacht / boat" : "Add a new yacht / boat"}
        />
      </header>
      <div className="row m-0">
        <div className="col-lg-3 col-12 p-2">
          <div className="sideBar_wrap">
            <SideBar createdYachtId={createdYachtId} />
            <VesselStatusForm id={id || createdYachtId} yacht={yacht} />
          </div>
        </div>

        <div className="col-lg-9 col-12 p-2">
          <Routes>
            <Route
              path="/"
              element={
                <MainInfo
                  id={id}
                  formData={formData}
                  setFormData={setFormData}
                  createdYachtId={createdYachtId}
                />
              }
            />
            <Route
              path="/media"
              element={
                <Media
                  id={id}
                  formData={formData}
                  setFormData={setFormData}
                  createdYachtId={createdYachtId}
                />
              }
            />
            <Route
              path="/boat-specification"
              element={
                <BoatSpecification
                  id={id}
                  formData={formData}
                  setFormData={setFormData}
                  createdYachtId={createdYachtId}
                />
              }
            />
            <Route
              path="/working-hours"
              element={
                <WorkingHours
                  id={id}
                  formData={formData}
                  setFormData={setFormData}
                  createdYachtId={createdYachtId}
                />
              }
            />
            <Route
              path="/pricing"
              element={
                <Pricing
                  id={id}
                  formData={formData}
                  setFormData={setFormData}
                  createdYachtId={createdYachtId}
                  initialPricesData={initialPricesData}
                  seasonCardInitialData={seasonCardInitialData}
                />
              }
            />
            <Route
              path="/addons-connected"
              element={
                <AddOnsConnected
                  id={id}
                  formData={formData}
                  setFormData={setFormData}
                  createdYachtId={createdYachtId}
                />
              }
            />
            <Route
              path="/more-info"
              element={
                <MoreInfo
                  id={id}
                  formData={formData}
                  setFormData={setFormData}
                  createdYachtId={createdYachtId}
                />
              }
            />
            <Route
              path="*"
              element={
                <MainInfo
                  id={id}
                  formData={formData}
                  setFormData={setFormData}
                  createdYachtId={createdYachtId}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </section>
  );
}
