import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import PricingAccordion from "./PricingAccordion";
import SubmitButton from "./../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";

const PackagePriceTime = ({
  id,
  setForm,
  formData,
  setFormData,
  isPriceTimeValid,
  setIsPriceTimeValid,
  createdPackageId
}) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Package Info");
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isPriceTimeValid) {
      setForm("Policy");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filteredFormData = formData?.trip_package_days?.filter(
      (obj) => obj.selected === true
    );

    const reqData = filteredFormData?.map((obj) => {
      return {
        day: obj.day,
        periods: obj.periods
      };
    });

    const payload = {
      step_id: 1,
      trip_package_id: id || createdPackageId,
      trip_package_days: reqData
    };

    try {
      const response = await axiosInstance.post(
        "/api/v1/trip/create_trip_package",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Trip Package Pricing Info Saved Successfully");
        setForm("Policy");
        queryClient.invalidateQueries(["trip-packages"]);
        queryClient.invalidateQueries(["trip-package", id || createdPackageId]);
        setIsPriceTimeValid(true);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Package Time & Price</h6>
        </div>
        <div className="col-12 p-2">
          <PricingAccordion formData={formData} setFormData={setFormData} />
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default PackagePriceTime;
