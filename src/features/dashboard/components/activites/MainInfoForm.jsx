import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  filterEmptyKeys,
  handleChange,
  handleFileUpload
} from "../../../../utils/helper";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../../utils/constants";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import fav from "../../../../assets/images/fav.png";
import useGetYachts from "./../../../../hooks/useGetYachts";
import MediaUploadField from "../../../../ui/form-elements/MediaUploadField";
import InputField from "../../../../ui/form-elements/InputField";
import SelectField from "../../../../ui/form-elements/SelectField";
import TextField from "../../../../ui/form-elements/TextField";
import Vat from "../../../../ui/Vat";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import WhatIncluded from "./WhatIncluded";
import axiosInstance from "../../../../utils/axiosInstance";
import useGetActivities from "../../../../hooks/useGetActivities";

const MainInfoForm = ({
  id,
  formData,
  setFormData,
  setForm,
  isValid,
  setIsValid,
  whatIsIncludedInitial,
  createdActivityId,
  hasParent
}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [hasParentYacht, setHasParentYacht] = useState(hasParent);
  const { data: yachts } = useGetYachts(PAGE_SIZE);
  const [, setSearchParams] = useSearchParams();
  const { refetch } = useGetActivities();

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Location");
    }
  };

  useEffect(() => {
    if (hasParent) {
      setHasParentYacht(true);
    }
  }, [hasParent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedAttachments = formData.images.filter((img) => img !== "");

    const payload = filterEmptyKeys({
      step_id: 1,
      images: updatedAttachments,
      video_link: formData.video_link,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      capacity: formData.capacity,
      quantity: formData.quantity,
      including: formData.including,
      restrictions: formData.restrictions,
      yacht_id: formData.yacht_id
      // vat: formData.vat
    });

    if (id || createdActivityId) {
      payload.activity_id = id || createdActivityId;
    }
    try {
      const response = await axiosInstance.post(
        "/api/v1/activity/create_activity",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Activity Main Info Saved Successfully");
        setForm("Location");
        setIsValid(true);
        setSearchParams({
          activity_id: response.data.id
        });
        refetch();
        queryClient.invalidateQueries(["activity", id || createdActivityId]);
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
                      formData.images && formData.images[i]
                        ? [formData.images[i]]
                        : null
                    }
                    handleFileUpload={(fileItems) =>
                      handleFileUpload(
                        fileItems,
                        "photos",
                        i,
                        setFormData,
                        "images",
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
        {/* package name */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            required
            label="Activity Name"
            placeholder="Write here"
            name="name"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* category */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            required
            label="Catagory"
            name="category"
            id="category"
            value={formData.category}
            onChange={(e) => handleChange(e, setFormData)}
            options={[
              {
                name: "Water activities",
                value: "water"
              },
              {
                name: "Shore activities",
                value: "shore"
              }
            ]}
          />
        </div>
        {/* description */}
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
        {/* capacity */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="Capacity"
            value={formData.capacity}
            placeholder="00"
            type="number"
            name="capacity"
            id="capacity"
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* quantity */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="Quantity"
            value={formData.quantity}
            placeholder="00"
            type="number"
            name="quantity"
            id="quantity"
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* whats included */}
        <div className="col-12 p-2">
          <WhatIncluded
            whatIsIncludedInitial={whatIsIncludedInitial}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* Need to know & restrictions about activity */}
        <div className="col-12 p-2">
          <TextField
            label="Need to know & restrictions about activity"
            id="restrictions"
            name="restrictions"
            placeholder="Write here"
            value={formData?.restrictions}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-12 p-2">
          <label htmlFor="parent_yacht" className="parent_yacht_label">
            Parent Yacht
            <Form.Check
              name="parent_yacht"
              id="parent_yacht"
              type="switch"
              checked={hasParentYacht}
              onChange={() => setHasParentYacht(!hasParentYacht)}
            />
          </label>
          <SelectField
            className={hasParentYacht ? "" : "disable"}
            id="yacht_id"
            value={formData?.yacht_id}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, yacht_id: e.target.value }));
            }}
            options={yachts?.data?.map((yacht) => ({
              name: yacht?.name_en,
              value: yacht?.id
            }))}
          />
        </div>
        {/* vat */}
        {!hasParentYacht && (
          <div className="col-12 p-2">
            <Vat />
          </div>
        )}
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
