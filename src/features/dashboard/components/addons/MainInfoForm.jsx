import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  filterEmptyKeys,
  handleChange,
  handleFileUpload
} from "../../../../utils/helper";
import { ADDONS_CATEGORIES, PAGE_SIZE } from "../../../../utils/constants";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import fav from "../../../../assets/images/fav.png";
import SubmitButton from "./../../../../ui/form-elements/SubmitButton";
import InputField from "./../../../../ui/form-elements/InputField";
import TextField from "../../../../ui/form-elements/TextField";
import SelectField from "./../../../../ui/form-elements/SelectField";
import Vat from "../../../../ui/Vat";
import MediaUploadField from "./../../../../ui/form-elements/MediaUploadField";
import useGetYachts from "./../../../../hooks/useGetYachts";
import useGetAddons from "../../../../hooks/useGetAddons";

export default function MainInfoForm({
  id,
  formData,
  setFormData,
  isValid,
  setIsValid,
  setForm,
  createdAddonId
}) {
  const queryClient = useQueryClient();
  const { data: yachts } = useGetYachts(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [hasParentYacht, setHasParentYacht] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const { refetch } = useGetAddons();

  useEffect(() => {
    if (formData.yacht_id) {
      setHasParentYacht(true);
    } else {
      setHasParentYacht(false);
    }
  }, [formData.yacht_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedAttachments = formData.attachments.filter((img) => img !== "");
    const formattedAttachments = updatedAttachments.map((img) => ({
      url: img,
      type: 1
    }));

    const requestBody = filterEmptyKeys({
      step_id: 1,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      quantity: formData.quantity,
      attachments: formattedAttachments,
      video_link: formData.video_link,
      yacht_id: formData.yacht_id
    });

    if (id || createdAddonId) {
      requestBody.addon_id = id || createdAddonId;
    }

    try {
      const res = await axiosInstance.post(
        "/api/v1/addon/create_addon",
        requestBody
      );

      if (res.status === 200 || res.status === 201) {
        refetch();
        queryClient.invalidateQueries(["addon", createdAddonId || id]);

        toast.success("main info saved successfully");
        setIsValid(true);
        setForm("Working Time");
        setSearchParams({ addon_id: res.data.id });
      }
    } catch (error) {
      console.error("Error creating addon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Working Time");
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Main Info</h6>
        </div>
        {/* photo upload */}
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
                      formData.attachments && formData.attachments[i]
                        ? [formData.attachments[i]]
                        : null
                    }
                    handleFileUpload={(fileItems) =>
                      handleFileUpload(
                        fileItems,
                        "photos",
                        i,
                        setFormData,
                        "attachments",
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
        <div className="col-12 p-2">
          <InputField
            required
            type="text"
            id="name"
            name="name"
            label="Addon Name"
            value={formData.name}
            placeholder="write here"
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-12 p-2">
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            placeholder="Write here"
            value={formData.description}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            required
            id="category"
            name="category"
            label="category"
            value={formData.category}
            onChange={(e) => handleChange(e, setFormData)}
            options={ADDONS_CATEGORIES}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="Quantity"
            id="quantity"
            required
            name="quantity"
            type="number"
            placeholder="00"
            value={formData.quantity}
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
            id="yacht_id"
            name="yacht_id"
            className={hasParentYacht ? "" : "disable"}
            value={formData.yacht_id}
            onChange={(e) => handleChange(e, setFormData)}
            options={yachts?.data?.map((yacht) => ({
              name: yacht.name_en,
              value: yacht.id
            }))}
          />
        </div>
        {!hasParentYacht && (
          <div className="col-12 p-2">
            <Vat />
          </div>
        )}
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <SubmitButton
            loading={loading || fileLoading}
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
}
