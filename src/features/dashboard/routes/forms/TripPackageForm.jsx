import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { DAYS } from "../../../../utils/constants";
import PageHeader from "./../../layout/PageHeader";
import PackageInfoForm from "../../components/trip-packages/PackageInfoForm";
import PackagePriceTime from "../../components/trip-packages/PackagePriceTime";
import PolicyForm from "../../components/trip-packages/PolicyForm";
import useGetTripPackageById from "./../../../../hooks/useGetTripPackageById";

export default function TripPackageForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const createdPackageId = searchParams.get("package_id");
  const [formData, setFormData] = useState({});
  const [form, setForm] = useState("Package Info");
  const [isMainInfoValid, setIsMainInfoValid] = useState(
    id || createdPackageId ? true : false
  );
  const [isPriceTimeValid, setIsPriceTimeValid] = useState(
    id || createdPackageId ? true : false
  );

  const { data: tripPackage } = useGetTripPackageById(id || createdPackageId);

  const addonsInitial = {
    addon_id: "",
    quantity: ""
  };

  const activitiesInitial = {
    activity_id: "",
    quantity: ""
  };

  const periodInitial = {
    start_time: "",
    end_time: "",
    price: "",
    period_id: ""
  };

  const pricesInitial = DAYS.map((day, index) => {
    return {
      day,
      index,
      selected: false,
      periods: [periodInitial]
    };
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: tripPackage?.name || "",
      description: tripPackage?.description || "",
      video_link: tripPackage?.video_link || "",
      images_list: tripPackage?.images_list || Array(3).fill(""),
      yacht_id: tripPackage?.yacht_id || "",
      period_of_activation_from: tripPackage?.period_of_activation_from || "",
      period_of_activation_to: tripPackage?.period_of_activation_to || "",
      activities:
        tripPackage?.activities?.length > 0
          ? tripPackage?.activities
          : [activitiesInitial],
      addons:
        tripPackage?.addons?.length > 0 ? tripPackage?.addons : [addonsInitial],
      policy: {
        cancellation_policy: tripPackage?.policy[0]?.cancellation_policy || [
          {
            cancel_before: "",
            percentage: "",
            type: "minutes"
          }
        ],
        weather_restrictions:
          tripPackage?.policy[0]?.weather_restrictions || "",
        rules_and_instructions:
          tripPackage?.policy[0]?.rules_and_instructions || "",
        allowed_and_not_allowed_items:
          tripPackage?.policy[0]?.allowed_and_not_allowed_items
      },
      trip_package_days:
        tripPackage?.trip_package_days?.length > 0
          ? tripPackage?.trip_package_days
          : pricesInitial
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripPackage]);

  const handleFormChange = (newForm) => {
    const steps = ["Package Info", "Package Time & Price", "Policy"];
    const newFormIndex = steps.indexOf(newForm);
    const currentFormIndex = steps.indexOf(form);
    if (newFormIndex < currentFormIndex) {
      setForm(newForm);
    } else {
      if (
        (form === "Package Info" && isMainInfoValid) ||
        (form === "Package Time & Price" && isPriceTimeValid) ||
        form === "Policy"
      ) {
        setForm(newForm);
      }
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader
          name={id ? "Edit Package" : "Create Package"}
          removeLast={id ? true : false}
        />
      </header>
      <div className="row m-0">
        <div className="inner_form_wrapper">
          <div className="wizard_tabs">
            {["Package Info", "Package Time & Price", "Policy"].map((fo, i) => (
              <div
                key={i}
                className={`wizard_tab ${form === fo ? "active" : ""}`}
                onClick={() => handleFormChange(fo)}
              >
                <div className="step_no">{i + 1}</div>
                <h6>{fo}</h6>
              </div>
            ))}
          </div>
          <div className="bg_white_card">
            {form === "Package Info" && (
              <PackageInfoForm
                id={id}
                setForm={setForm}
                formData={formData}
                setFormData={setFormData}
                isMainInfoValid={isMainInfoValid}
                setIsMainInfoValid={setIsMainInfoValid}
                addonsInitial={addonsInitial}
                activitiesInitial={activitiesInitial}
                createdPackageId={createdPackageId}
              />
            )}
            {form === "Package Time & Price" && (
              <PackagePriceTime
                id={id}
                setForm={setForm}
                formData={formData}
                setFormData={setFormData}
                isPriceTimeValid={isPriceTimeValid}
                createdPackageId={createdPackageId}
                setIsPriceTimeValid={setIsPriceTimeValid}
              />
            )}
            {form === "Policy" && (
              <PolicyForm
                id={id}
                setForm={setForm}
                formData={formData}
                setFormData={setFormData}
                createdPackageId={createdPackageId}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
