import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import InputField from "./../form-elements/InputField";
import GoogleMaps from "./../GoogleMaps";
import SubmitButton from "./../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import SelectField from "./../form-elements/SelectField";

const AddDestinationModal = ({
  showModal,
  setShowModal,
  target,
  setTarget,
  fetchDestinations
}) => {
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;
  const [loading, setLoading] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState("Search on Map");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showLocationFirst, setShowLocationFirst] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (target && target.point && target.name_on_map) {
      setFormData({
        ...target
      });
      setLocationPoint({
        lat: target.point.lat,
        lng: target.point.lng
      });
      setSearchedPlace(target.name_on_map);
      setShowLocationFirst(true);
    } else {
      setShowLocationFirst(false);
    }
  }, [target]);

  const [LocationPoint, setLocationPoint] = useState({
    lat: 24.7136,
    lng: 46.6753
  });

  const [formData, setFormData] = useState({
    point: LocationPoint,
    type: "",
    name: "",
    name_on_map: "",
    sub_user: subUser
  });

  useEffect(() => {
    setFormData({
      ...formData,
      name_on_map: searchedPlace,
      point: LocationPoint
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedPlace]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.request({
        method: target?.id ? "PATCH" : "POST",
        url: target?.id ? `/locations/${target?.id}/` : "/locations/",
        data: formData
      });
      if (response.status === 201 || response.status === 200) {
        hideModal();
        fetchDestinations();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hideModal = () => {
    setFormData({
      name: "",
      name_on_map: "",
      sub_user: subUser,
      point: {
        lat: 24.7136,
        lng: 46.6753
      }
    });
    setTarget({});
    setLocationPoint({
      lat: 24.7136,
      lng: 46.6753
    });
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={hideModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Add New Destination</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit}>
          <div className="row m-0">
            {/* location */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label={"Location Name"}
                placeholder={"write here"}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <SelectField
                label={"Type"}
                value={formData.type}
                placeholder={"write here"}
                id={"type"}
                options={[
                  {
                    name: "Destination",
                    value: 2
                  },
                  {
                    name: "Location",
                    value: 1
                  }
                ]}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
            </div>
            <div className="col-12 p-2">
              {mapLoaded && (
                <GoogleMaps
                  formData={LocationPoint}
                  setFormData={setLocationPoint}
                  setSearchedPlace={setSearchedPlace}
                  showLocationFirst={showLocationFirst}
                />
              )}
            </div>
            <div className="col-12 p-2">
              <SubmitButton name={"Save"} loading={loading} />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDestinationModal;
