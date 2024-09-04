import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  filterEmptyKeys,
  handleChange,
  handleFileUpload
} from "../../../../utils/helper";
import { PAGE_SIZE } from "../../../../utils/constants";
import fav from "../../../../assets/images/fav.png";
import useGetYachts from "./../../../../hooks/useGetYachts";
import useGetAddons from "../../../../hooks/useGetAddons";
import useGetActivities from "./../../../../hooks/useGetActivities";
import MediaUploadField from "../../../../ui/form-elements/MediaUploadField";
import InputField from "../../../../ui/form-elements/InputField";
import DatePicker from "../../../../ui/form-elements/DatePicker";
import SelectField from "./../../../../ui/form-elements/SelectField";
import TextField from "../../../../ui/form-elements/TextField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import AddonsToConnect from "./AddonsToConnect";
import ActivitiesToConnect from "./ActivitiesToConnect";
import axiosInstance from "../../../../utils/axiosInstance";

const PackageInfoForm = ({
  id,
  setForm,
  formData,
  setFormData,
  isMainInfoValid,
  setIsMainInfoValid,
  addonsInitial,
  activitiesInitial,
  createdPackageId
}) => {
  const [, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data: yachts } = useGetYachts(PAGE_SIZE);
  const { data: addons } = useGetAddons(PAGE_SIZE);
  const { data: activities } = useGetActivities(PAGE_SIZE);

  const handleNext = (e) => {
    e.preventDefault();
    if (isMainInfoValid) {
      setForm("Package Time & Price");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedAttachments = formData.images_list.filter((img) => img !== "");

    const payload = filterEmptyKeys({
      step_id: 1,
      name: formData.name,
      description: formData.description,
      period_of_activation_from: formData.period_of_activation_from,
      period_of_activation_to: formData.period_of_activation_to,
      video_link: formData.video_link,
      yacht_id: Number(formData.yacht_id),
      images_list: updatedAttachments,
      activities: formData.activities,
      addons: formData.addons
    });
    if (id || createdPackageId) {
      payload.trip_package_id = id || createdPackageId;
    }
    try {
      const response = await axiosInstance.post(
        "/api/v1/trip/create_trip_package",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Trip Package Main Info Saved Successfully");
        setForm("Package Time & Price");
        setIsMainInfoValid(true);
        queryClient.invalidateQueries(["trip-packages"]);
        queryClient.invalidateQueries(["trip-package", id || createdPackageId]);
        setSearchParams({ package_id: response.data.id });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Package Info</h6>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="photos">
              Upload Photos <span>( Maximum 3 Pictures )</span>
            </label>
            <div className="photos">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <MediaUploadField
                    key={i}
                    allowMultiple={false}
                    pannelRatio=".88"
                    labelIdle={`${
                      i === 0 ? '<label class="mainImg">Main Image</label>' : ""
                    } <img src=${fav} alt="fav"/>`}
                    accept={["image/*"]}
                    files={
                      formData.images_list && formData.images_list[i]
                        ? [formData.images_list[i]]
                        : null
                    }
                    handleFileUpload={(fileItems) =>
                      handleFileUpload(
                        fileItems,
                        "photos",
                        i,
                        setFormData,
                        "images_list",
                        setFileLoading,
                        fileLoading
                      )
                    }
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <MediaUploadField
            label="Upload Video"
            hint="( Max Size 20MB )"
            labelIdle="Drag & Drop your files or Browse"
            pannelRatio=".283"
            accept={["video/*"]}
            allowMultiple={false}
            files={formData.video_link ? [formData.video_link] : null}
            handleFileUpload={(fileItems) =>
              handleFileUpload(
                fileItems,
                "videos",
                null,
                setFormData,
                "video_link",
                setFileLoading,
                fileLoading
              )
            }
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            required
            type="text"
            label="Package Name"
            name="name"
            id="name"
            placeholder="write here"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            required
            id="yacht_id"
            name="yacht_id"
            label="Parent Yacht"
            value={formData.yacht_id}
            onChange={(e) => handleChange(e, setFormData)}
            options={yachts?.data?.map((yacht) => ({
              name: yacht.name_en,
              value: yacht.id
            }))}
          />
        </div>
        <div className="col-lg-12 p-2 input-field">
          <label>Period of package activation </label>
          <div className="row px-2">
            <div className="col-lg-6 col-12 p-2">
              <DatePicker
                beforeContent={"From"}
                value={formData.period_of_activation_from}
                id="period_of_activation_from"
                name="period_of_activation_from"
                required
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <DatePicker
                beforeContent={"To"}
                value={formData.period_of_activation_to}
                id="period_of_activation_to"
                name="period_of_activation_to"
                required
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
          </div>
        </div>
        <div className="col-12 p-2">
          <TextField
            label="Description"
            id="description"
            name="description"
            placeholder="Write here"
            value={formData.description}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <AddonsToConnect
          addons={addons?.data}
          formData={formData}
          setFormData={setFormData}
          addonsInitial={addonsInitial}
        />
        <ActivitiesToConnect
          formData={formData}
          activities={activities?.data}
          setFormData={setFormData}
          activitiesInitial={activitiesInitial}
        />
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

export default PackageInfoForm;
