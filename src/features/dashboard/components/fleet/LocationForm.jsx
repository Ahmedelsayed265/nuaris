import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import SelectField from "../../../../ui/form-elements/SelectField";
import InputField from "../../../../ui/form-elements/InputField";
import MapLocationField from "../../../../ui/form-elements/MapLocationField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import MapModal from "../../../../ui/modals/MapModal";
import axiosInstance from "../../../../utils/axiosInstance";
import useGetCountries from "../../../../hooks/useGetCountries";
import useGetCitiesByCountry from "../../../../hooks/useGetCitiesByCountry";

const LocationForm = ({
  id,
  setForm,
  yacht,
  formData,
  setFormData,
  isValid,
  setIsValid,
  createdYachtId
}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [showModalVessel, setShowModalVessel] = useState(false);
  const [showModalMeeting, setShowModalMeeting] = useState(false);
  const [countryName, setCountryName] = useState(formData?.country || null);

  const [vesselLocation, setVesselLocation] = useState(
    formData?.location?.address || "Search on Map"
  );

  const [meetingLocation, setMeetingLocation] = useState(
    formData?.meeting_location?.address || "Search on Map"
  );

  const { data: countries } = useGetCountries();
  const { data: cities } = useGetCitiesByCountry(countryName);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: vesselLocation
      },
      meeting_location: {
        ...prev.meeting_location,
        address: meetingLocation
      }
    }));
  }, [vesselLocation, meetingLocation, setFormData]);

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Crew");
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Main Info");
  };

  const handleSelectCity = (cityName) => {
    setMeetingLocation(cityName);
    setVesselLocation(cityName);
    const selectedCity = cities?.find((city) => city.name === cityName);
    if (selectedCity) {
      setFormData((prev) => ({
        ...prev,
        city: cityName,
        location: {
          lat: Number(selectedCity.latitude).toFixed(6),
          lng: Number(selectedCity.longitude).toFixed(6)
        },
        meeting_location: {
          lat: Number(selectedCity.latitude).toFixed(6),
          lng: Number(selectedCity.longitude).toFixed(6)
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      step_id: 2,
      yacht_id: id || createdYachtId,
      country: formData.country,
      city: formData.city,
      marina: formData.marina,
      location: formData.location,
      meeting_location: formData.meeting_location
    };
    try {
      const response = await axiosInstance.post(
        "/api/v1/yacht/create_yacht",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Yacht Location Info Saved Successfully");
        setForm("Crew");
        setIsValid(true);
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
          <h6 className="form_title">Location</h6>
        </div>
        {/* Country */}
        <div className="col-12 p-2">
          <SelectField
            label="Vessel Location"
            hint="( Country )"
            required
            id="country"
            name="country"
            value={formData.country}
            options={countries?.map((country) => ({
              name: country?.name,
              value: country?.name
            }))}
            onChange={(e) => {
              setFormData({ ...formData, country: e.target.value, city: "" });
              setCountryName(e.target.value);
            }}
          />
        </div>
        {/* City */}
        <div className="col-12 p-2">
          <SelectField
            label="Vessel Location"
            hint="( City )"
            required
            name="city"
            id="city"
            value={formData.city}
            options={cities?.map((city) => ({
              name: city?.name,
              value: city?.name
            }))}
            onChange={(e) => handleSelectCity(e.target.value)}
          />
        </div>
        {/* marina */}
        <div className="col-12 p-2">
          <InputField
            label="Vessel Location"
            hint="( Marina )"
            required
            id="marina"
            name="marina"
            placeholder="write marina name"
            value={formData.marina}
            onChange={(e) =>
              setFormData({ ...formData, marina: e.target.value })
            }
          />
        </div>
        {/* vessel location lat & lng */}
        <div className="col-12 p-2">
          <MapLocationField
            htmlFor="vesselLocationOnMap"
            label="Vessel Location"
            hint="(map)"
            name={vesselLocation}
            setShowModal={setShowModalVessel}
          />
        </div>
        {/* meeting location lat & lng */}
        <div className="col-12 p-2">
          <MapLocationField
            htmlFor="meetingLocation"
            label="Meeting Location"
            name={meetingLocation}
            setShowModal={setShowModalMeeting}
          />
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3 ">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            name="Save"
            loading={loading}
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
      {/* map modal vessel location */}
      <MapModal
        showModal={showModalVessel}
        setShowModal={setShowModalVessel}
        setFormData={setFormData}
        formData={formData}
        target="location"
        title="Vessel Location"
        showLocationFirst={yacht ? true : false}
        setSearchedPlace={setVesselLocation}
      />
      {/* map modal meeting location */}
      <MapModal
        showModal={showModalMeeting}
        setShowModal={setShowModalMeeting}
        setFormData={setFormData}
        formData={formData}
        target="meeting_location"
        title="Meeting Location"
        showLocationFirst={yacht ? true : false}
        setSearchedPlace={setMeetingLocation}
      />
    </form>
  );
};

export default LocationForm;
