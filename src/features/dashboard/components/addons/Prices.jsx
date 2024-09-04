import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../utils/axiosInstance";
import PriceRow from "./PriceRow";
import addIcon from "../../../../assets/images/icons/add.svg";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import useGetAddons from "../../../../hooks/useGetAddons";

const Prices = ({
  id,
  setForm,
  formData,
  setFormData,
  pricesInitial,
  createdAddonId
}) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { refetch } = useGetAddons();

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Working Time");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/addon/create_addon", {
        step_id: 3,
        addon_id: id ? id : createdAddonId,
        prices: formData?.prices
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Prices Saved Successfully");
        refetch();
        queryClient.invalidateQueries(["addon", id || createdAddonId]);
        navigate("/dashboard/addons");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error?.response
          ? "minimum price should be less than price"
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddPriceRow = (e) => {
    e.preventDefault();
    if (formData.prices.length < 6) {
      setFormData((prev) => ({
        ...prev,
        prices: [...prev.prices, { ...pricesInitial }]
      }));
    }
  };

  const handleDeleteRow = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      prices: prev.prices?.filter((_, index) => index !== indexToDelete) || []
    }));
  };

  const handleChange = (index, field, value) => {
    const updatedFormData = [...formData.prices];
    if (field === "price_type") {
      updatedFormData.forEach((data, i) => {
        if (i !== index && data.price_type === value) {
          updatedFormData[i] = { ...data, price_type: "" };
        }
      });
    }
    updatedFormData[index] = { ...updatedFormData[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      prices: updatedFormData
    }));
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2 d-flex align-items-center justify-content-between">
          <h6 className="form_title mb-0">Prices</h6>
          <button onClick={handleAddPriceRow} type="button">
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>
        {formData.prices?.map((data, index) => (
          <PriceRow
            key={index}
            index={index}
            formData={data}
            length={formData.prices.length}
            handleChange={handleChange}
            onDelete={handleDeleteRow}
          />
        ))}
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
        </div>
      </div>
    </form>
  );
};

export default Prices;
