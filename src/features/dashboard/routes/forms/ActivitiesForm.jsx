import { useEffect, useState } from "react";
import { DAYS } from "../../../../utils/constants";
import { useParams, useSearchParams } from "react-router-dom";
import PageHeader from "../../layout/PageHeader";
import MainInfoForm from "./../../components/activites/MainInfoForm";
import Location from "../../components/activites/Location";
import WorkingHours from "../../components/activites/WorkingHours";
import Prices from "../../components/activites/Prices";
import PolicyForm from "../../components/activites/PolicyForm";
import useGetActivityById from "../../../../hooks/useGetActivityById";

const ActivitiesForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState("Main Info");
  const [searchParams] = useSearchParams();
  const createdActivityId = searchParams.get("activity_id");

  const [isMainInfoValid, setIsMainInfoValid] = useState(
    id || createdActivityId ? true : false
  );
  const [isLocationValid, setIsLocationValid] = useState(
    id || createdActivityId ? true : false
  );
  const [isWorkingHoursValid, setIsWorkingHoursValid] = useState(
    id || createdActivityId ? true : false
  );
  const [isPricesValid, setIsPricesValid] = useState(
    id || createdActivityId ? true : false
  );

  const { data: activity } = useGetActivityById(id || createdActivityId);

  const whatIsIncludedInitial = {
    including_id: "",
    quantity: ""
  };

  const workingHoursInitial = DAYS.map((day, index) => {
    return {
      day,
      index,
      selected: false,
      hours: [{ from_time: "00:00", to_time: "00:00" }]
    };
  });

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

  const [formData, setFormData] = useState({
    images: Array(3).fill(""),
    video_link: "",
    name: "",
    category: "",
    description: "",
    capacity: "",
    quantity: "",
    including: [whatIsIncludedInitial],
    restrictions: "",
    yacht_id: "",
    vat: null,
    location_id: "",
    working_hours: workingHoursInitial,
    advance_payment_percentage: 100,
    minimum_rental_period: "",
    prices: [initialPricesData],
    season_prices: [seasonCardInitialData],
    policy: {
      cancellation_policy: [
        {
          cancel_before: "",
          percentage: "",
          type: "minutes"
        }
      ],
      weather_restrictions: "",
      rules_and_instructions: "",
      allowed_and_not_allowed_items: ""
    }
  });

  useEffect(() => {
    if (activity?.id) {
      const newWorkingHours = workingHoursInitial.map((item) => {
        const yachtWorkingHour = activity?.working_hours?.working_hours?.find(
          (yachtHour) => yachtHour.day === item.day
        );
        if (yachtWorkingHour) {
          return {
            ...item,
            hours: yachtWorkingHour.hours,
            selected: true
          };
        }
        return item;
      });

      setFormData((prev) => ({
        ...prev,
        images:
          activity?.images?.map((img) => img?.url || "") || Array(5).fill(""),
        video_link: activity?.video_link || "",
        name: activity?.name || "",
        category: activity?.category || "",
        description: activity?.description || "",
        capacity: activity?.capacity || "",
        quantity: activity?.quantity || "",
        including:
          activity?.including?.length > 0
            ? activity?.including
            : [whatIsIncludedInitial],
        restrictions: activity?.restrictions || "",
        yacht_id: activity?.yacht_id || "",
        vat: activity?.vat || null,
        location_id: activity?.location_id || "",
        working_hours: newWorkingHours,

        advance_payment_percentage: activity?.advance_payment_percentage || 100,
        minimum_rental_period: activity?.minimum_rental_period?.id || "",
        min__type: activity?.minimum_rental_period?.type || "",
        prices:
          activity?.prices?.length > 0 ? activity?.prices : [initialPricesData],
        season_prices:
          activity?.season_prices?.length > 0
            ? activity?.season_prices
            : [seasonCardInitialData],

        policy: {
          cancellation_policy: activity?.policy[0]?.cancellation_policy || [
            {
              cancel_before: "",
              percentage: "",
              type: "minutes"
            }
          ],
          weather_restrictions: activity?.policy[0]?.weather_restrictions || "",
          rules_and_instructions:
            activity?.policy[0]?.rules_and_instructions || "",
          allowed_and_not_allowed_items:
            activity?.policy[0]?.allowed_and_not_allowed_items
        }
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  const handleFormChange = (newForm) => {
    const steps = [
      "Main Info",
      "Location",
      "Working hours",
      "Prices",
      "Policy"
    ];
    const newFormIndex = steps.indexOf(newForm);
    const currentFormIndex = steps.indexOf(form);
    if (newFormIndex < currentFormIndex) {
      setForm(newForm);
    } else {
      if (
        (form === "Main Info" && isMainInfoValid) ||
        (form === "Location" && isLocationValid) ||
        (form === "Working hours" && isWorkingHoursValid) ||
        (form === "Prices" && isPricesValid) ||
        form === "Policy"
      ) {
        setForm(newForm);
      }
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Add New Activity" />
      </header>
      <div className="row m-0">
        <div className="inner_form_wrapper">
          <div className="wizard_tabs">
            {["Main Info", "Location", "Working hours", "Prices", "Policy"].map(
              (fo, i) => (
                <div
                  key={i}
                  className={`wizard_tab ${form === fo ? "active" : ""}`}
                  onClick={() => handleFormChange(fo)}
                >
                  <div className="step_no">{i + 1}</div>
                  <h6>{fo}</h6>
                </div>
              )
            )}
          </div>
          <div className="bg_white_card">
            {form === "Main Info" && (
              <MainInfoForm
                id={id}
                formData={formData}
                setFormData={setFormData}
                setForm={setForm}
                isValid={isMainInfoValid}
                setIsValid={setIsMainInfoValid}
                hasParent={activity?.yacht_id || false}
                whatIsIncludedInitial={whatIsIncludedInitial}
                createdActivityId={createdActivityId}
              />
            )}
            {form === "Location" && (
              <Location
                id={id}
                createdActivityId={createdActivityId}
                formData={formData}
                setFormData={setFormData}
                setForm={setForm}
                isValid={isLocationValid}
                setIsValid={setIsLocationValid}
              />
            )}
            {form === "Working hours" && (
              <WorkingHours
                id={id}
                createdActivityId={createdActivityId}
                formData={formData}
                setFormData={setFormData}
                setForm={setForm}
                isValid={isWorkingHoursValid}
                setIsValid={setIsWorkingHoursValid}
              />
            )}
            {form === "Prices" && (
              <Prices
                id={id}
                createdActivityId={createdActivityId}
                formData={formData}
                setFormData={setFormData}
                setForm={setForm}
                seasonCardInitialData={seasonCardInitialData}
                isValid={isPricesValid}
                setIsValid={setIsPricesValid}
                initialPricesData={initialPricesData}
              />
            )}
            {form === "Policy" && (
              <PolicyForm
                id={id}
                createdActivityId={createdActivityId}
                setForm={setForm}
                formData={formData}
                setFormData={setFormData}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesForm;
