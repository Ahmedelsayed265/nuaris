import { useEffect, useState } from "react";
import { BRANDS, PREP_TIME, TYPE } from "../../../../utils/constants";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  filterEmptyKeys,
  handleChange,
  handleFileUpload
} from "../../../../utils/helper";
import InputField from "./../../../../ui/form-elements/InputField";
import SelectField from "./../../../../ui/form-elements/SelectField";
import SubmitButton from "./../../../../ui/form-elements/SubmitButton";
import TextField from "./../../../../ui/form-elements/TextField";
import MediaUploadField from "../../../../ui/form-elements/MediaUploadField";
import axiosInstance from "./../../../../utils/axiosInstance";
import useGetYachtCategories from "../../../../hooks/useGetYachtCategories";
import useGetPeriodTypes from "../../../../hooks/useGetPeriodTypes";

const MainInfoForm = ({
  id,
  setForm,
  formData,
  setFormData,
  isValid,
  setIsValid,
  createdYachtId
}) => {
  const [type, setType] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [filteredDurations, setFilteredDurations] = useState([]);

  const [, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { data: categories } = useGetYachtCategories();
  const { data: durations } = useGetPeriodTypes(6);

  useEffect(() => {
    const updatedDurations = durations?.filter((t) => {
      return t?.type === Number(type);
    });

    setFilteredDurations(updatedDurations);
  }, [durations, type]);

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Location");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const currentDate = new Date();
    const licenseExpireDate = new Date(formData.license_expire_date);

    if (licenseExpireDate < currentDate) {
      toast.error("License Expire Date cannot be less than current date");
      setLoading(false);
      return;
    }

    const payload = filterEmptyKeys({
      step_id: 1,
      brand: formData.brand,
      category_id: formData.category_id,
      type: formData.type,
      name_en: formData.name_en,
      name_ar: formData.name_ar,
      fleet_number: formData.fleet_number,
      license_number: formData.license_number,
      license_file: formData.license_file,
      license_expire_date: formData.license_expire_date,
      description_en: formData.description_en,
      description_ar: formData.description_ar,
      preparation_time: formData.preparation_time
    });
    if (id || createdYachtId) {
      payload.yacht_id = id || createdYachtId;
    }
    try {
      const response = await axiosInstance.post(
        "/api/v1/yacht/create_yacht",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Yacht Main Info Saved Successfully");
        setForm("Location");
        setIsValid(true);
        setSearchParams({ yacht_id: response?.data?.id });
        queryClient.invalidateQueries(["yachts"]);
        queryClient.invalidateQueries(["yacht", id || createdYachtId]);
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
          <h6 className="form_title">Main Info</h6>
        </div>
        {/* boat type */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            label="Boat Type"
            id="type"
            name="type"
            options={TYPE}
            value={formData.type}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* vessel brand */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            label="Vessel Brand"
            id="brand"
            name="brand"
            options={BRANDS.map((brand) => ({
              name: brand,
              value: brand
            }))}
            value={formData.brand}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-12 p-2">
          <SelectField
            label="Boat Category"
            id="category_id"
            name="category_id"
            required
            options={
              categories?.map((category) => ({
                name: `${category?.name} - ${category?.description}`,
                value: category?.id
              })) || []
            }
            value={formData.category_id}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* vessel name english */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="Vessel Name"
            hint="( English )"
            id="name_en"
            name="name_en"
            placeholder="Write here"
            value={formData.name_en}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* vessel name arabic */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="Vessel Name"
            hint="( عربى )"
            id="name_ar"
            name="name_ar"
            placeholder="Write here"
            value={formData.name_ar}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* vessel number */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="number"
            min={0}
            label="Vessel Number"
            placeholder="Write here"
            id="fleet_number"
            name="fleet_number"
            value={formData.fleet_number}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* vessel license number */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="number"
            label="Vessel license Number"
            id="license_number"
            name="license_number"
            value={formData.license_number}
            placeholder="Write here"
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* Vessel License and registration */}
        <div className="col-12 p-2">
          <MediaUploadField
            label="Vessel License and registration"
            labelIdle="Drag & Drop your files or Browse"
            pannelRatio=".075"
            accept={["application/pdf"]}
            allowMultiple={false}
            files={formData.license_file ? [formData.license_file] : null}
            handleFileUpload={(fileItems) =>
              handleFileUpload(
                fileItems,
                "docs",
                null,
                setFormData,
                "license_file",
                setFileLoading,
                fileLoading
              )
            }
          />
        </div>
        {/* license expiration date */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="date"
            label="License expiration date"
            id="license_expire_date"
            name="license_expire_date"
            value={formData.license_expire_date}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* preparation time */}
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="preparation_time">Preperation Time</label>
            <div className="time-units">
              <select
                className="units w-100"
                name="minits"
                id="minits"
                value={formData?.preparation_time}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    preparation_time: e.target.value
                  }))
                }
              >
                <option value="">Select</option>
                {filteredDurations?.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.display_duration}
                  </option>
                ))}
              </select>

              <select
                className="units"
                name="period_type"
                id="units"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setFormData({
                    ...formData,
                    preparation_time: ""
                  });
                }}
              >
                {PREP_TIME.map((unit, index) => (
                  <option key={index} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* description english */}
        <div className="col-lg-6 col-12 p-2">
          <TextField
            hint="( English )"
            label="Description"
            placeholder="Write here"
            id="description_en"
            name="description_en"
            value={formData.description_en}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* description arabic */}
        <div className="col-lg-6 col-12 p-2">
          <TextField
            hint="( عربى )"
            label="Description"
            placeholder="Write here"
            id="description_ar"
            name="description_ar"
            value={formData.description_ar}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <SubmitButton
            loading={loading}
            fileLoading={fileLoading}
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

export default MainInfoForm;
