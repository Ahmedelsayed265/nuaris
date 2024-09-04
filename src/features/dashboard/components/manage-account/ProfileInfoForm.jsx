import {
  fetchCitiesForCountry,
  filterEmptyKeys,
  formatNumber,
  handleChange,
  handleFileUpload,
  handlePhoneChange,
  handleSelectCity,
  handleSelectCountry,
  stripSpaces
} from "../../../../utils/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import MediaUploadField from "../../../../ui/form-elements/MediaUploadField";
import InputField from "../../../../ui/form-elements/InputField";
import PhoneField from "../../../../ui/form-elements/PhoneField";
import ReactFlagsSelect from "react-flags-select";
import SelectField from "../../../../ui/form-elements/SelectField";
import TextField from "../../../../ui/form-elements/TextField";
import MapLocationField from "../../../../ui/form-elements/MapLocationField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import MapModal from "../../../../ui/modals/MapModal";
import axiosInstance from "../../../../utils/axiosInstance";

const ProfileInfoForm = () => {
  const user = useSelector((state) => state.authedUser?.user || {});
  const [loading, setLoading] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState("search on map");
  const [showMapModal, setShowMapModal] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const [cityNameList, setCityNameList] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        logo: user.logo || null,
        email: user.email || "",
        mobile_number: user.mobile_number || "",
        commercial_name: user.commercial_name || "",
        country: user.country || "SA",
        city: user.city || "",
        licence_number: user.licence_number || "",
        registration_number: user.registration_number || "",
        lat: user.lat || 24.7136,
        lng: user.lng || 46.6753,
        about: user.about || "",
        currency: user.currency || "SAR",
        location_on_map: user.location_on_map || ""
      };
    });
    setSearchedPlace(user.location_on_map || "search on map");
  }, [user]);

  useEffect(() => {
    fetchCitiesForCountry(formData.country, setCityList, setCityNameList);
  }, [formData.country]);

  useEffect(() => {
    if (searchedPlace !== "search on map") {
      setFormData((prev) => ({
        ...prev,
        location_on_map: searchedPlace
      }));
    }
  }, [searchedPlace, setFormData]);

  const handleNumberChange = (e) => {
    let { value } = e.target;
    value = stripSpaces(value);
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const formattedValue = formatNumber(value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value
    }));
    e.target.value = formattedValue;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const filteredData = filterEmptyKeys(formData);
      await axiosInstance.post("/api/v1/user/signup", filteredData);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg_white_card">
      <form className="form_ui" onSubmit={handleSubmit}>
        <div className="row m-0">
          <div className="col-12 p-2">
            <h6 className="form_title">Profile Info</h6>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <MediaUploadField
              label="Upload Your Logo"
              hint="(PNG or JPG)"
              labelIdle="LOGO"
              companyLogo={true}
              pannelRatio={0.2988}
              accept={["image/png", "image/jpeg"]}
              files={formData.logo ? [formData.logo] : []}
              handleFileUpload={(fileItems) =>
                handleFileUpload(
                  fileItems,
                  "photos",
                  null,
                  setFormData,
                  "logo",
                  setFileLoading,
                  fileLoading
                )
              }
            />
          </div>
          <div className="col-lg-6 col-12 p-2 d-flex flex-column gap-3">
            <InputField
              label="First Name"
              placeholder="Ex: james"
              required
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={(e) => handleChange(e, setFormData)}
            />
            <InputField
              label="Family Name"
              placeholder="Ex: brian"
              required
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <InputField
              label="Email Address"
              placeholder="EX: mail@mail.com"
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <PhoneField
              label="Mobile Number"
              placeholder="Enter phone number"
              required
              id="mobile_number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={(e) =>
                handlePhoneChange(e, "mobile_number", setFormData)
              }
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <InputField
              label="Commercial Name"
              placeholder="EX: Ocean Network Express."
              type="text"
              id="commercial_name"
              name="commercial_name"
              value={formData.commercial_name}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <InputField
              label={
                user.registration_type === "company"
                  ? "Registration Number"
                  : "License Number"
              }
              name={
                user.registration_type === "company"
                  ? "registration_number"
                  : "licence_number"
              }
              id={
                user.registration_type === "company"
                  ? "registration_number"
                  : "licence_number"
              }
              type="text"
              pattern="\d{4} \d{4} \d{4} \d{4}"
              placeholder="XXXX XXXX XXXX XXXX"
              value={
                user && user?.registration_type === "company"
                  ? formatNumber(formData?.registration_number || "")
                  : formatNumber(formData?.licence_number || "")
              }
              onChange={handleNumberChange}
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="companyLocation">
                Company Location. <span>(Country)</span>
              </label>
              <ReactFlagsSelect
                searchable={true}
                selectedSize={false}
                selected={formData?.country}
                onSelect={(code) => {
                  handleSelectCountry(code, setFormData);
                }}
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <SelectField
              label="city"
              name="city"
              id="city"
              required
              options={cityNameList?.map((city) => ({
                name: city,
                value: city
              }))}
              value={formData.city}
              onChange={(e) =>
                handleSelectCity(
                  e.target.value,
                  setSearchedPlace,
                  setFormData,
                  cityList
                )
              }
            />
          </div>
          <div className="col-12 p-2">
            <SelectField
              label="Currency"
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
              name="currency"
              id="currency"
              options={[
                { value: "SAR", name: "SAR" },
                { value: "AED", name: "AED " },
                { value: "USD", name: "USD" },
                { value: "EUR", name: "EUR" }
              ]}
            />
          </div>
          <div className="col-12 p-2">
            <MapLocationField
              htmlFor="companyLocationOnMap"
              label="Company Location"
              hint="(on map)"
              name={searchedPlace}
              setShowModal={setShowMapModal}
            />
          </div>
          <div className="col-12 p-2">
            <TextField
              label={"Something about your Company"}
              value={formData.about}
              id={"about"}
              name={"about"}
              placeholder={"Write Here"}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <MapModal
            formData={formData}
            setFormData={setFormData}
            title="Company Location"
            showModal={showMapModal}
            setShowModal={setShowMapModal}
            setSearchedPlace={setSearchedPlace}
          />
        </div>
        <div className="col-12 p-2">
          <SubmitButton loading={loading} name="Save" className={"mt-3"} />
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
