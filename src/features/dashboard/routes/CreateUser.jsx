import { useState } from "react";
import { handleChange, handlePhoneChange } from "../../../utils/helper";
import { toast } from "react-toastify";
import ReactFlagsSelect from "react-flags-select";
import PageHeader from "../layout/PageHeader";
import NameField from "../../../ui/NameField";
import InputField from "../../../ui/form-elements/InputField";
import PhoneField from "../../../ui/form-elements/PhoneField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import useGetPositions from "../../../hooks/useGetPositions";
import axiosInstance from "../../../utils/axiosInstance";
import AssignGroup from "../components/AssignGroup";

const CreateUser = () => {
  const { data: positions } = useGetPositions();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email: "",
    position: "",
    country: "SA"
  });

  const [showAssignGroups, setShowAssignGroups] = useState(false);
  const [invitedUserId, setInvitedUserId] = useState(null);

  const handleCountrySelect = (code) => {
    setSelectedCountry(code);
    setFormData((prevFormData) => ({ ...prevFormData, country: code }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.mobile_number?.length > 15) {
      toast.error("Please enter a valid phone number");
      setLoading(false);
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/api/v1/users/create_employee",
        formData
      );
      if (response?.status === 201 || response?.status === 200) {
        toast.success("Invitation sent successfully");
        setShowAssignGroups(true);
        setInvitedUserId(response?.data?.id);
      } else {
        toast.error(
          "User with this phone number already exists, check your email if you want to override the phone number."
        );
      }
    } catch (error) {
      console.log("error =>", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Create a User" hint="(employee)" />
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            <form onSubmit={handleSubmit} className="row m-0 form_ui">
              <div className="col-lg-4  col-12 p-2">
                <NameField
                  formData={formData}
                  setFormData={setFormData}
                  name1="first_name"
                  name2="last_name"
                />
              </div>
              <div className="col-lg-4  col-12 p-2">
                <div className="input-field">
                  <label htmlFor="positions">Positions</label>
                  <select
                    defaultValue={"select"}
                    name="positions"
                    id="positions"
                    required
                    onChange={(e) => {
                      const selectedOptionId =
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "id"
                        );
                      setFormData({
                        ...formData,
                        position: Number(selectedOptionId)
                      });
                    }}
                  >
                    <option value="select" disabled>
                      Select
                    </option>
                    {positions?.map((option) => (
                      <option
                        key={option.id}
                        id={option.id}
                        value={option.name}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-4  col-12 p-2">
                <div className="input-field">
                  <label htmlFor="country">country</label>
                  <ReactFlagsSelect
                    searchable={true}
                    selectedSize={false}
                    onSelect={handleCountrySelect}
                    selected={selectedCountry || "SA"}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  placeholder="EX: mail@mail.com"
                  label="Email Address"
                  type="email"
                  id="email"
                  name="email"
                  required
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
              <div className="col-12 p-2 d-flex justify-content-end">
                <SubmitButton
                  loading={loading}
                  name="Create"
                  className="w-25"
                />
              </div>
            </form>
          </div>
        </div>
        {showAssignGroups && <AssignGroup invitedUserId={invitedUserId} />}
      </div>
    </section>
  );
};

export default CreateUser;
