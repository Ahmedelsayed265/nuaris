import { useState } from "react";
import { filterEmptyKeys, handleChange } from "../../../../utils/helper";
import { FUEL, YEARS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../../../ui/form-elements/InputField";
import SelectField from "../../../../ui/form-elements/SelectField";
import CustomInputWithUnit from "../../../../ui/form-elements/CustomInputWithUnit";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";

const BoatSpecification = ({ id, formData, setFormData, createdYachtId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payLoad = filterEmptyKeys({
      yacht_id: id || createdYachtId,
      capacity: formData.capacity,
      year_of_manufacture: formData.year_of_manufacture,
      depth: formData.depth,
      length: formData.length,
      engine_quantity: formData.engine_quantity,
      engine_size: formData.engine_size,
      fuel: formData.fuel,
      bathrooms: formData.bathrooms,
      sleeping_cabins: formData.sleeping_cabins,
      single_beds: formData.single_beds,
      double_beds: formData.double_beds,
      queen_beds: formData.queen_beds,
      king_beds: formData.king_beds,
      sofa_beds: formData.sofa_beds,
      accept_sleeping_arrangement: false
    });
    try {
      const response = await axiosInstance.post(
        "/api/v1/yacht/fleet_specifications",
        payLoad
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Boat Specification Saved Successfully");
        navigate(
          id
            ? `/dashboard/fleet/edit-yacht/${id}/working-hours`
            : `/dashboard/fleet/add-yacht/working-hours?yacht_id=${createdYachtId}`
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
      <form className="form_ui specifications" onSubmit={handleSubmit}>
        <div className="bg_white_card mb-3">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Engine</h6>
            </div>
            {/* Max Capacity */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="Max Capacity."
                placeholder="00"
                hint="(People)"
                id="capacity"
                name="capacity"
                type="number"
                min={0}
                value={formData.capacity}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* Year of Manufacture */}
            <div className="col-lg-6 col-12 p-2">
              <SelectField
                label="Year of Manufacture."
                id="year_of_manufacture"
                name="year_of_manufacture"
                options={YEARS.map((year) => ({
                  name: year,
                  value: year
                }))}
                value={formData.year_of_manufacture}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* Vessel Depth */}
            <div className="col-lg-6 col-12 p-2">
              <CustomInputWithUnit
                htmlFor="depth"
                label="Vessel Depth"
                id="vesselDepth"
                units={["Meter", "Feet", "Inch", "Yard"]}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Vessel length */}
            <div className="col-lg-6 col-12 p-2">
              <CustomInputWithUnit
                htmlFor="length"
                label="Vessel length"
                id="vesselLength"
                units={["Meter", "Feet", "Inch", "Yard"]}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Engine Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="Engine Qty."
                type="number"
                min={0}
                placeholder="00"
                id="engine_quantity"
                name="engine_quantity"
                value={formData.engine_quantity}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* Engine Size */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                name="engine_size"
                label="Engine Size."
                type="number"
                min={0}
                placeholder="00"
                hint="(HP)"
                id="engine_size"
                value={formData.engine_size}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* Engine Size */}
            <div className="col-12 p-2">
              <SelectField
                label="Fuel."
                id="fuel"
                name="fuel"
                value={formData.fuel}
                options={FUEL}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
          </div>
        </div>
        <div className="bg_white_card mb-4">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Rooms</h6>
            </div>
            {/* No. of Bathrooms */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="No. of Bathrooms."
                type="number"
                min={0}
                placeholder="00"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* No. of Sleeping Capacity */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="No. of Sleeping Capacity."
                type="number"
                min={0}
                placeholder="00"
                id="sleeping_cabins"
                name="sleeping_cabins"
                value={formData.sleeping_cabins}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* Single Beds Qty. */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="Single Beds Qty."
                type="number"
                min={0}
                placeholder="00"
                id="single_beds"
                name="single_beds"
                value={formData.single_beds}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* Double Beds Qty. */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="Double Beds Qty."
                type="number"
                placeholder="00"
                id="double_beds"
                name="double_beds"
                value={formData.double_beds}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* Queen Beds Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="Queen Beds Qty."
                type="number"
                placeholder="00"
                id="queen_beds"
                name="queen_beds"
                value={formData.queen_beds}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* King Bed Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="King Bed Qty."
                id="king_beds"
                name="king_beds"
                type="number"
                min={0}
                placeholder="00"
                value={formData.king_beds}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* Sofa Beds Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="Sofa Beds Qty."
                type="number"
                min={0}
                placeholder="00"
                id="sofa_beds"
                name="sofa_beds"
                value={formData.sofa_beds}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            {/* Accepting sleeping arrangements */}
            <div className="col-lg-6 col-12 p-2">
              <div className="input-field">
                <label htmlFor="sleepingArrangements">
                  Accepting sleeping arrangements
                </label>
                <div className="checkboxs_inputs">
                  <span
                    className={`bg-active ${
                      formData.accept_sleeping_arrangement === false
                        ? "refuse"
                        : ""
                    }`}
                  />
                  <label htmlFor="accept">
                    <input
                      type="radio"
                      name="sleepingArrangements"
                      id="accept"
                      checked={formData.accept_sleeping_arrangement === true}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          accept_sleeping_arrangement: true
                        });
                      }}
                    />
                    <span>Accept</span>
                  </label>
                  <label htmlFor="refuse">
                    <input
                      type="radio"
                      name="sleepingArrangements"
                      id="refuse"
                      checked={formData.accept_sleeping_arrangement === false}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          accept_sleeping_arrangement: false
                        });
                      }}
                    />
                    <span>Refuse</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <SubmitButton
            className="save_btn ms-auto"
            name="Save"
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default BoatSpecification;
