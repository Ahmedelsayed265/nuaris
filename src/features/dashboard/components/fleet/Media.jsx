import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { filterEmptyKeys, handleFileUpload } from "../../../../utils/helper";
import { useQueryClient } from "@tanstack/react-query";
import photoSessionImg from "../../../../assets/images/photoSession.svg";
import fav from "../../../../assets/images/fav.png";
import MediaUploadField from "../../../../ui/form-elements/MediaUploadField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";

const Media = ({ id, formData, setFormData, createdYachtId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payLoad = filterEmptyKeys({
      yacht_id: id || Number(createdYachtId),
      images: formData.images,
      video_link: formData.video_link
    });

    try {
      const response = await axiosInstance.post(
        "/api/v1/yacht/add_yacht_media",
        payLoad
      );
      console.log(response.status);

      if (response.status === 200 || response.status === 201) {
        toast.success("Yacht Media & Photos Saved Successfully");
        queryClient.invalidateQueries(["yachts"]);
        queryClient.invalidateQueries(["yacht", id || createdYachtId]);
        navigate(
          id
            ? `/dashboard/fleet/edit-yacht/${id}/boat-specification`
            : `/dashboard/fleet/add-yacht/boat-specification?yacht_id=${createdYachtId}`
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form_ui" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Media & Photos</h6>
            </div>
            <div className="col-12 p-2">
              <div className="request_photo_session">
                <div className="content">
                  <h5>Request a Photo session</h5>
                  <p>
                    luxurious documentation that creatively highlights the
                    beauty and luxury of the yacht.
                  </p>
                  <button onClick={(e) => e.preventDefault()}>
                    Request Now
                  </button>
                </div>
                <div className="bread_crumb">
                  <img src={photoSessionImg} alt="breadCrumb" />
                </div>
              </div>
            </div>
            {/* photo upload */}
            <div className="col-12 p-2">
              <div className="input-field">
                <label htmlFor="photos">
                  Upload Photos <span>( Maximum 5 Pictures )</span>
                </label>
                <div className="photos">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <MediaUploadField
                        key={i}
                        allowMultiple={false}
                        pannelRatio=".88"
                        labelIdle={`${
                          i === 0
                            ? '<label class="mainImg">Main Image</label>'
                            : ""
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
            {/* video upload */}
            <div className="col-12 p-2">
              <MediaUploadField
                label="Upload Video"
                hint="( Max Size 20MB )"
                labelIdle="Drag & Drop your files or Browse"
                pannelRatio=".2"
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
            <div className="col-12 p-2 pt-4 d-flex gap-3 ">
              <SubmitButton
                className={"save_btn ms-auto"}
                loading={loading}
                fileLoading={fileLoading}
                name={"Save"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Media;
